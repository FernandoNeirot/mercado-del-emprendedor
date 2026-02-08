import { getAdminFirestore } from '@/shared/configs/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

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
      const db = getAdminFirestore();
      const body = await request.json();
      const docRef = await db.collection("stores").add(body);
  
      return NextResponse.json(
        { data: { id: docRef.id, ...body }, error: null },
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

