import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import {signIn} from "next-auth/react";
import Router from "next/router";
import apiClient from "../../../lib/api/apiClient";
export default NextAuth({
  providers:[
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret:process.env.JWT_SECRET,
  callbacks:{
    async signIn({user,account,profile,email,credentials}){
      return true
    },
    async jwt({token,account,profile}){
      console.log("token",token)
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    }
    
  },
  events:{
    async signIn(message){
        console.log("signIn",message)
    },
    async signOut(message) { console.log("signOut:",message) },
  },
  pages:{
    signIn:'/login'
  }
});