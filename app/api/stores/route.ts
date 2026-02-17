import { getAdminFirestore } from "@/shared/configs/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { getUidFromRequest } from "@/shared/lib/auth";

export async function GET() {
  try {
    const db = getAdminFirestore();
    const snapshot = await db.collection("stores").orderBy("name").get();
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

export async function POST(request: NextRequest) {
  try {
    const uid = await getUidFromRequest(request);
    if (!uid) {
      return NextResponse.json(
        { data: null, error: "No autorizado" },
        { status: 401 }
      );
    }

    const db = getAdminFirestore();
    const body = await request.json();
    const { userId: _omit, ...rest } = body;
    const storeData = { ...rest, userId: uid };
    const docRef = await db.collection("stores").add(storeData);

    return NextResponse.json(
      { data: { id: docRef.id, ...storeData }, error: null },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error creating store";
    return NextResponse.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}

