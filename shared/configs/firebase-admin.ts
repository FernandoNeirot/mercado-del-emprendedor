import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getStorage, type Storage } from "firebase-admin/storage";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Convierte literales \n en newlines reales para evitar
 * OpenSSL "DECODER routines::unsupported" (error:1E08010C) en producción
 * (p. ej. Cloud Run inyecta env vars y la clave suele llegar mal formateada).
 * Orden: \\n (doble escape) → \n, luego \n (literal) → newline real.
 * Si la clave PEM viene en una sola línea (newlines eliminados), reintroduce saltos cada 64 chars.
 */
function normalizePrivateKey(key: string): string {
  let out = key
    .replace(/\\\\n/g, "\\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
  // En algunos hosts la clave llega sin newlines (una sola línea); OpenSSL necesita PEM con saltos.
  const begin = "-----BEGIN PRIVATE KEY-----";
  const end = "-----END PRIVATE KEY-----";
  if (out.includes(begin) && out.includes(end) && !out.includes("\n")) {
    const base64 = out.slice(out.indexOf(begin) + begin.length, out.indexOf(end)).replace(/\s/g, "");
    const lines = base64.match(/.{1,64}/g) || [];
    out = `${begin}\n${lines.join("\n")}\n${end}`;
  }
  return out;
}

let adminApp: App;
let adminStorage: Storage;
let adminFirestore: Firestore;

export function initializeAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0]!;
  }

  let projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  let clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Opción: FIREBASE_SERVICE_ACCOUNT_JSON con el JSON completo (útil en Cloud Run/Secret Manager)
  // También acepta base64 para evitar problemas de newlines en env vars.
  const jsonKey = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (jsonKey) {
    try {
      let raw: string = typeof jsonKey === "string" ? jsonKey : JSON.stringify(jsonKey);
      if (raw.startsWith("eyJ")) {
        try {
          raw = Buffer.from(raw, "base64").toString("utf-8");
        } catch {
          /* no es base64 */
        }
      }
      const parsed = JSON.parse(raw) as Record<string, string>;
      projectId = projectId || parsed.project_id;
      clientEmail = clientEmail || parsed.client_email;
      privateKey = parsed.private_key ?? privateKey;
    } catch {
      // ignorar, usar env vars individuales
    }
  }

  if (!projectId || !storageBucket) {
    throw new Error(
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID y NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET deben estar configurados"
    );
  }

  // Normalizar PRIVATE_KEY: OpenSSL falla con "DECODER routines::unsupported" si \n es literal (barra+n) en vez de salto real.
  if (clientEmail && privateKey) {
    privateKey = privateKey.trim();
    // Si viene en base64 (sin -----BEGIN), decodificar
    if (!privateKey.includes("-----BEGIN")) {
      try {
        const decoded = Buffer.from(privateKey, "base64").toString("utf-8");
        if (decoded.includes("-----BEGIN")) privateKey = decoded;
      } catch {
        /* no es base64 */
      }
    }
    // Crítico: en env vars \n suele venir como los 2 caracteres \ y n. OpenSSL necesita newline real.
    // Orden: \\n (doble escape) → \n, luego \n (literal) → newline real. Incluir String.raw-style y CRLF/CR.
    privateKey = normalizePrivateKey(privateKey);
  }

  if (clientEmail && privateKey) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        storageBucket,
      });
      return adminApp;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      const isDecoderError = /DECODER routines::unsupported|1E08010C|ERR_OSSL_UNSUPPORTED/i.test(msg);
      console.error("[Firebase Admin] Error al inicializar con credenciales:", error);
      if (isDecoderError) {
        throw new Error(
          "Firebase Admin: la clave privada no pudo decodificarse (DECODER unsupported). " +
            "Comprueba que FIREBASE_PRIVATE_KEY use newlines reales o que FIREBASE_SERVICE_ACCOUNT_JSON esté bien formado. " +
            "En Google Cloud (Cloud Run) puedes omitir FIREBASE_PRIVATE_KEY y FIREBASE_CLIENT_EMAIL y usar Application Default Credentials (cuenta de servicio del recurso)."
        );
      }
      throw new Error(
        "Error al configurar Firebase Admin SDK con las credenciales proporcionadas"
      );
    }
  }

  try {
    adminApp = initializeApp({
      projectId,
      storageBucket,
    });
    return adminApp;
  } catch {
    throw new Error(
      "Firebase Admin SDK requiere credenciales. " +
        "Configura FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY en tus variables de entorno, " +
        "o usa Application Default Credentials (gcloud auth application-default login)"
    );
  }
}

export function getAdminStorage(): Storage {
  if (!adminStorage) {
    const app = initializeAdminApp();
    adminStorage = getStorage(app);
  }
  return adminStorage;
}

export function getAdminFirestore(): Firestore {
  if (!adminFirestore) {
    const app = initializeAdminApp();
    adminFirestore = getFirestore(app);
  }
  return adminFirestore;
}
