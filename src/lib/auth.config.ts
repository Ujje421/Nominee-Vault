import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
  },
  providers: [], // Providers are added in auth.ts
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || "super-secret-vault-key-change-in-production-123!",
  trustHost: true,
} satisfies NextAuthConfig;
