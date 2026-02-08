import { getAdminFirestore } from '@/shared/configs/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
      const db = getAdminFirestore();
      const id = request.nextUrl.pathname.split('/').pop();
      const snapshot = await db
        .collection("stores")
        .where("slug", "==", id ?? "")
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
        { data: {}, error: errorMessage },
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

    const body = await request.json();
    const { id: _omit, ...updateData } = body;
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