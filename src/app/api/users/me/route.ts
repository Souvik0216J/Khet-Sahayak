import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getDataFromToken } from "@/lib/getDataFromToken";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request); // userDoc.id stored in JWT

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userSnap.data();

    // remove sensitive fields
    const {
      password,
      lastLogin,
      ...safeUserData
    } = userData;

    return NextResponse.json({
      message: "User found",
      success: true,
      user: { id: userId, ...safeUserData },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
