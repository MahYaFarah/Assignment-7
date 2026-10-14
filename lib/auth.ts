import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

function originFrom(value: string | undefined) {
  if (!value) return undefined;
  try {
    return new URL(value.includes("://") ? value : `https://${value}`).origin;
  } catch {
    return undefined;
  }
}

const uri = process.env.MONGODB_URL?.trim() || process.env.MONGODB_URI?.trim();
if (!uri) throw new Error("MONGODB_URL (or MONGODB_URI) is required for authentication");

const configuredAuthOrigin = originFrom(process.env.BETTER_AUTH_URL);
const vercelOrigins = [
  originFrom(process.env.VERCEL_URL),
  originFrom(process.env.VERCEL_BRANCH_URL),
  originFrom(process.env.VERCEL_PROJECT_PRODUCTION_URL),
].filter((origin): origin is string => Boolean(origin));
const authOrigin = configuredAuthOrigin || vercelOrigins[0];
const trustedOrigins = [...new Set([authOrigin, ...vercelOrigins].filter((origin): origin is string => Boolean(origin)))];

// Reuse the pool during Next.js development reloads.
const globalForMongo = globalThis as typeof globalThis & { bazarDorMongoClient?: MongoClient };
const client = globalForMongo.bazarDorMongoClient ?? new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
if (process.env.NODE_ENV !== "production") globalForMongo.bazarDorMongoClient = client;

export const auth = betterAuth({

  database: mongodbAdapter(client.db(process.env.MONGODB_DB_NAME?.trim() || "bazardor"), { client, transaction: false }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: authOrigin,
  ...(trustedOrigins.length > 0 ? { trustedOrigins } : {}),
  emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: false },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET } }
      : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? { github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET } }
      : {}),
  },
});
