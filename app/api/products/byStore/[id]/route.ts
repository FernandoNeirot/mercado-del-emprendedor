import { getAdminFirestore } from '@/shared/configs/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
      const db = getAdminFirestore();
      const id = request.nextUrl.pathname.split('/').pop();
      const snapshot = await db
        .collection("products")
        .where("storeId", "==", id ?? "")
        .get();

      const docs = snapshot.docs;

      if (docs.length === 0) {
        return NextResponse.json(
          { data: [], error: "No products found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { data: docs.map((doc) => ({ id: doc.id, ...doc.data() })), error: null, total: docs.length },
        { status: 200 }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error getting products";
      return NextResponse.json(
        { data: {}, error: errorMessage },
        { status: 500 }
      );
    }
  }