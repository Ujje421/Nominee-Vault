import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export const { auth } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|claim).*)",
  ],
};

export default auth;
