import { db } from "@/lib/firebaseConfig"
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {name, roverId, farmName, email, confirmPassword} = reqBody;

    // Check if user exists
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password 
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(confirmPassword, salt);

    // Time in IST
    const date = new Date();
    const istTime = date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    const lastLogin = "null";

    // Save user to Firestore
    const newUser = {
      name: name,
      farmName: farmName,
      roverId: roverId,
      email: email,
      password: hashedPassword,
      date: istTime,
      lastLogin,
    };

    await addDoc(usersRef, newUser);

    return NextResponse.json(
      { message: "User created", success: true, user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
