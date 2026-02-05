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

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !storageBucket) {
    throw new Error(
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID y NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET deben estar configurados"
    );
  }

  if (clientEmail && privateKey) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
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
