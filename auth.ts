import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

function getAllowedEmails() {
  return (process.env.STUDIO_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

const allowedEmails = getAllowedEmails();

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      if (!allowedEmails.length) {
        return false;
      }

      return allowedEmails.includes(user.email.toLowerCase());
    },
    async authorized({ auth: session, request }) {
      const pathname = request.nextUrl.pathname;

      if (!pathname.startsWith("/studio")) {
        return true;
      }

      return Boolean(session?.user?.email && allowedEmails.includes(session.user.email.toLowerCase()));
    },
  },
});
