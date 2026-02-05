import { getAdminFirestore } from "@/shared/configs/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const db = getAdminFirestore();
    const segments = request.nextUrl.pathname.split("/");
    const id = segments[segments.indexOf("products") + 1];

    const snapshot = await db
      .collection("products")
      .where("id", "==", id ?? "")
      .limit(1)
      .get();

    const doc = snapshot.docs[0];
    if (!doc) {
      return NextResponse.json(
        { data: null, error: "Store not found" },
        { status: 404 }
      );
    }

    const docRef = doc.ref;
    const currentData = doc.data();
    const isActive = !(currentData?.isActive ?? false);

    await docRef.update({ isActive });

    return NextResponse.json(
      { data: { id: doc.id, ...currentData, isActive }, error: null },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error toggling store";
    return NextResponse.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}
