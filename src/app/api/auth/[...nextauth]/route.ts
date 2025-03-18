import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { CustomPrismaAdapter } from "@/lib/auth-adapter";

const handler = NextAuth({
  adapter: CustomPrismaAdapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImageUrl: user.profileImageUrl,
          followingIds: user.followingIds,
          followerIds: user.followerIds,
        };
      },
    }),
    // map Google profile to User model
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        const nameParts = profile.name?.split(" ") || ["", ""];
        const firstName = nameParts[0] || "User";
        const lastName = nameParts.slice(1).join(" ") || "";

        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          firstName: firstName,
          lastName: lastName,
          profileImageUrl: profile.picture,
          followingIds: [],
          followerIds: [],
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if ("firstName" in user) token.firstName = user.firstName;
        if ("lastName" in user) token.lastName = user.lastName;
        if ("profileImageUrl" in user)
          token.profileImageUrl = user.profileImageUrl;
        token.followerIds = user.followerIds || [];
        token.followingIds = user.followingIds || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        if ("firstName" in token)
          session.user.firstName = token.firstName as string;
        if ("lastName" in token)
          session.user.lastName = token.lastName as string;
        if ("profileImageUrl" in token)
          session.user.profileImageUrl = token.profileImageUrl as string | null;

        session.user.followerIds = token.followerIds || [];
        session.user.followingIds = token.followingIds || [];
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: true,
});

export { handler as GET, handler as POST };
