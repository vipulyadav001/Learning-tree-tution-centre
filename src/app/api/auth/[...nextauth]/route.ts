import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "google",
      name: "Google",
      credentials: {},
      async authorize() {
        return {
          id: "1",
          name: "Demo User",
          email: "demo@example.com",
          image: "https://picsum.photos/200",
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: '/',
  },
})

export { handler as GET, handler as POST }
