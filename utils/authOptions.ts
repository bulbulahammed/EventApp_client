import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // If the user is signing in for the first time
      if (account && profile) {
        token.accessToken = account.access_token;
        token.id = profile.sub || account.id || account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      // Safely assign accessToken with explicit type assertion
      session.accessToken = token.accessToken as string | undefined;
      // Ensure session.user is defined and assign the id
      session.user = session.user || {};
      session.user.id = token.id as string | undefined;
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin"
  },
  secret: process.env.NEXTAUTH_SECRET
};
