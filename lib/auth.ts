// export type LocalUser = { name: string; email: string; provider?: string };
// const KEY = "bazardor-user";

// export function getStoredUser(): LocalUser | null {
//   if (typeof window === "undefined") return null;
//   try { return JSON.parse(window.localStorage.getItem(KEY) || "null") as LocalUser | null; } catch { return null; }
// }

// export function setStoredUser(user: LocalUser) { window.localStorage.setItem(KEY, JSON.stringify(user)); window.dispatchEvent(new Event("bazardor-auth")); }
// export function clearStoredUser() { window.localStorage.removeItem(KEY); window.dispatchEvent(new Event("bazardor-auth")); }


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db();

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  },

  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
  database: mongodbAdapter(db, {
    client,
  }),
});