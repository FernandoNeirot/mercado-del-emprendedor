import { getAdminFirestore } from "@/shared/configs/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { getUidFromRequest } from "@/shared/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const db = getAdminFirestore();
    const id = request.nextUrl.pathname.split("/").pop() ?? "";

    // 1) Try by document id first (for product.storeId, etc.)
    const docRef = db.collection("stores").doc(id);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      return NextResponse.json(
        { data: { id: docSnap.id, ...docSnap.data() }, error: null },
        { status: 200 }
      );
    }

    // 2) Fallback: query by slug
    const snapshot = await db
      .collection("stores")
      .where("slug", "==", id)
      .limit(1)
      .get();

    const doc = snapshot.docs[0];
    if (!doc) {
      return NextResponse.json(
        { data: null, error: "Store not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: { id: doc.id, ...doc.data() }, error: null },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error getting store";
    return NextResponse.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: slugOrId } = await params;
    const db = getAdminFirestore();
    const snapshot = await db
      .collection("stores")
      .where("slug", "==", slugOrId)
      .limit(1)
      .get();

    const doc = snapshot.docs[0];
    if (!doc) {
      return NextResponse.json(
        { data: null, error: "Store not found" },
        { status: 404 }
      );
    }

    const uid = await getUidFromRequest(request);
    if (!uid) {
      return NextResponse.json(
        { data: null, error: "No autorizado" },
        { status: 401 }
      );
    }

    const storeData = doc.data();
    const storeUserId = storeData?.userId;
    // Si la tienda tiene userId, verificar que sea del usuario actual
    if (storeUserId && storeUserId !== uid) {
      return NextResponse.json(
        { data: null, error: "No tenés permiso para editar esta tienda" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id: _omit, userId: _omitUid, ...updateData } = body;
    await doc.ref.update(updateData);

    return NextResponse.json(
      { data: { id: doc.id, ...doc.data(), ...updateData }, error: null },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error updating store";
    return NextResponse.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}