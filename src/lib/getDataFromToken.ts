import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';

        if (!token) {
            return null;
        }

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        return null;  // Return null instead of throwing to handle gracefully
    }
}
