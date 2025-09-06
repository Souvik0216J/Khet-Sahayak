import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig"
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Find user by email
    const q = query(collection(db, "users"), where("email", "==", email));
    const snap = await getDocs(q);

    if (snap.empty) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    const userDoc = snap.docs[0];
    const userData = userDoc.data();

    // Check password
    const validPassword = await bcryptjs.compare(password, userData.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Create token
    const tokenData = {
      id: userDoc.id,
      email: userData.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    // Update last login in IST
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const loginTime = date.toLocaleString("en-IN", options);

    await updateDoc(doc(db, "users", userDoc.id), {
      lastLogin: loginTime,
    });

    // Send response with JWT in cookie
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
