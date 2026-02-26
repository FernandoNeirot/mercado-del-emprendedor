import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/shared/configs/firebase-admin";
import { getUidFromRequest } from "@/shared/lib/auth";

/**
 * GET /api/my-stores
 * Lista las tiendas del usuario autenticado (por userId).
 * Requiere cookie __session.
 *
 * Validar fetch vs caché:
 * - Terminal: cada vez que se ejecuta la ruta se imprime "GET /api/my-stores".
 * - Network (DevTools): filtrar por "my-stores"; si no hay nueva petición = caché.
 * - Respuesta: header X-Served-At y body._servedAt con timestamp; si ves el mismo valor al volver = caché.
 */
export async function GET(request: NextRequest) {
  const servedAt = Date.now();
  console.log("GET /api/my-stores", servedAt);
  try {
    const uid = await getUidFromRequest(request);
    if (!uid) {
      // En producción suele ser: cookie no enviada (login en otro dominio) o token expirado/inválido.
      const res = NextResponse.json({ data: [], error: "No autorizado" }, { status: 401 });
      res.headers.set("X-Auth-Reason", "no-uid");
      return res;
    }

    const db = getAdminFirestore();
    // Índice requerido: stores (userId Ascending, name Ascending)
    const snapshot = await db
      .collection("stores")
      .where("userId", "==", uid)
      .orderBy("name")
      .get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString?.() ?? doc.data().createdAt,
    }));

    const body = { data, error: null, _servedAt: servedAt };
    const res = NextResponse.json(body, { status: 200 });
    res.headers.set("X-Served-At", String(servedAt));
    return res;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error listing stores";
    return NextResponse.json({ data: null, error: errorMessage }, { status: 500 });
  }
}
