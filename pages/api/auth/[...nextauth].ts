import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET_KEY,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60 * 11, // 11 hours
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email" },
        password: { label: "password" },
      },
      async authorize(credentials, req) {
        try {
          const result: SuccessResponse<{
            user_id: string;
            access_token: string;
          }> = await fetcher({
            url: "/auth/login/users",
            method: "POST",
            data: credentials,
          });

          return {
            user_id: result.data.user_id,
            access_token: result.data.access_token,
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
        token.user_id = user.user_id;
        token.access_token = user.access_token;
      }
      return token;
    },

    session({ session, token }) {
      session.user.user_id = token.user_id;
      session.user.access_token = token.access_token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
