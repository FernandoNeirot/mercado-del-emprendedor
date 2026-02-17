import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/shared/configs/firebase-admin";
import { getUidFromRequest } from "@/shared/lib/auth";

/**
 * GET /api/my-stores
 * Lista las tiendas del usuario autenticado (por userId).
 * Requiere cookie __session.
 */
export async function GET(request: NextRequest) {
  try {
    const uid = await getUidFromRequest(request);
    if (!uid) {
      return NextResponse.json({ data: [], error: "No autorizado" }, { status: 401 });
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
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.() ?? doc.data().createdAt,
    }));

    return NextResponse.json({ data, error: null }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error listing stores";
    return NextResponse.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}
