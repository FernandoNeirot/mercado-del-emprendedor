import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getStorage, type Storage } from "firebase-admin/storage";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

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
  const jsonKey = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (jsonKey) {
    try {
      const parsed =
        typeof jsonKey === "string" ? (JSON.parse(jsonKey) as Record<string, string>) : jsonKey;
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
    // Orden: \\n (doble escape) → \n, luego \n (literal) → newline real, luego CRLF/CR.
    privateKey = privateKey
      .replace(/\\\\n/g, "\\n")
      .replace(/\\n/g, "\n")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n");
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
      console.error(
        "[Firebase Admin] Error al inicializar con credenciales:",
        error
      );
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
