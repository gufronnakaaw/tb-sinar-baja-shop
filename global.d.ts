import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user_id: string;
    nama: string;
    access_token: string;
  }
}

declare module "next-auth" {
  interface User {
    user_id: string;
    nama: string;
    access_token: string;
    id?: string;
  }

  interface Session {
    user: {
      user_id: string;
      nama: string;
      access_token: string;
    };
  }
}
