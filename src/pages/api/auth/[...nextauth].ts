import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { Adapter } from "next-auth/adapters";
//import type { NextAuthOptions } from "next-auth";

export default NextAuth({
  // secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
// };

//export default NextAuth(authOptions);
