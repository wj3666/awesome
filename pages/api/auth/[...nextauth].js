import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import apiClient from "../../../lib/api/apiClient";
import stores from "../../../lib/stores/stores";
import console from "console";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      
      return true;
    },
    async jwt({ token, account, profile }) {
      // console.log("token",token)
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    }
  },
  events: {
    async signIn(message) {
      // console.log("signIn", message);
    },
    async signOut(message) {
      //  console.log(message)
    },
  },
  pages: {
    signIn: "/login",
  },
});
