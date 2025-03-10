import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      profileImageUrl?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string | null;
  }
}
