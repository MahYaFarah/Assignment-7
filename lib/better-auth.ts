import { betterAuth } from "better-auth";
import { memoryAdapter } from "@better-auth/memory-adapter";

// The production app can swap the in-memory store for the adapter of choice.
// Keeping this configuration in one place makes the email/password and OAuth
// contract explicit while the client remains usable for a static preview.
const memoryDb: Record<string, any[]> = {};

export const auth = betterAuth({
  database: memoryAdapter(memoryDb),
  secret: process.env.BETTER_AUTH_SECRET || "bazardor-local-preview-secret-change-me",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID || "preview-google-client", clientSecret: process.env.GOOGLE_CLIENT_SECRET || "preview-google-secret" },
    github: { clientId: process.env.GITHUB_CLIENT_ID || "preview-github-client", clientSecret: process.env.GITHUB_CLIENT_SECRET || "preview-github-secret" },
  },
});
