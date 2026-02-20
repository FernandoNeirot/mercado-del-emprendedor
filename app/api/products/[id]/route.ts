import { getAdminFirestore } from "@/shared/configs/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const db = getAdminFirestore();
    const id = request.nextUrl.pathname.split("/").pop() ?? "";

    // 1) Try by document id first (for /product/[id] routes)
    const docRef = db.collection("products").doc(id);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      return NextResponse.json(
        { data: { id: docSnap.id, ...docSnap.data() }, error: null },
        { status: 200 }
      );
    }

    // 2) Fallback: query by slug
    const snapshot = await db
      .collection("products")
      .where("slug", "==", id)
      .limit(1)
      .get();
    const doc = snapshot.docs[0];
    if (!doc) {
      return NextResponse.json(
        { data: null, error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { data: { id: doc.id, ...doc.data() }, error: null },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error getting product";
    return NextResponse.json({ data: null, error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getAdminFirestore();
    const docRef = db.collection("products").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      const bySlug = await db
        .collection("products")
        .where("slug", "==", id)
        .limit(1)
        .get();
      const doc = bySlug.docs[0];
      if (!doc) {
        return NextResponse.json(
          { data: null, error: "Product not found" },
          { status: 404 }
        );
      }
      const body = await request.json();
      const { id: _omit, storeId: _omitStore, createdAt: _omitCreated, ...updateData } = body;
      await doc.ref.update(updateData);
      const updated = await doc.ref.get();
      const data = updated.data();
      return NextResponse.json(
        { data: { id: updated.id, ...data }, error: null },
        { status: 200 }
      );
    }

    const body = await request.json();
    const { id: _omit, storeId: _omitStore, createdAt: _omitCreated, ...updateData } = body;
    await docRef.update(updateData);
    const updated = await docRef.get();
    const data = updated.data();
    return NextResponse.json(
      { data: { id: updated.id, ...data }, error: null },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error updating product";
    return NextResponse.json({ data: null, error: errorMessage }, { status: 500 });
  }
}
