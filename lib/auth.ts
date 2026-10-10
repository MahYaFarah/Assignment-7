import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;
if (!uri) throw new Error("MONGODB_URL is required for authentication");

// Reuse the pool during Next.js development reloads.
const globalForMongo = globalThis as typeof globalThis & { bazarDorMongoClient?: MongoClient };
const client = globalForMongo.bazarDorMongoClient ?? new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
if (process.env.NODE_ENV !== "production") globalForMongo.bazarDorMongoClient = client;

export const auth = betterAuth({
  database: mongodbAdapter(client.db(process.env.MONGODB_DB_NAME || "bazardor"), { client }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true, minPasswordLength: 6 },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET } }
      : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? { github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET } }
      : {}),
  },
});
