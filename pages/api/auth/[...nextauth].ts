import { SuccessResponse } from "@/types/global.type";
import { serverFetcher } from "@/utils/fetcher";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET_KEY,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60 * 10, // 10 hours
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "username" },
        password: { label: "password" },
      },
      async authorize(credentials, req) {
        try {
          const result: SuccessResponse<{ id: string; role: string }> =
            await serverFetcher({
              url: "/users/login",
              method: "POST",
              data: credentials,
            });

          return {
            id: result.data.id,
            role: result.data.role,
          };
        } catch (error) {
          throw new Error(JSON.stringify(error));
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);
