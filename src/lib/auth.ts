import { betterAuth } from "better-auth";

let authInstance;
if (process.env.VERCEL_ENV === 'production' && !process.env.DATABASE_URL) {
  // For Vercel production without DB, create minimal instance
  authInstance = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET || "fallback-secret",
    // No database for serverless compatibility
  });
} else {
  // Configuration for PostgreSQL database
  authInstance = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-change-in-production",
    database: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "",
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: true,
          default: "user"
        }
      }
    },
  });
}

export const auth = authInstance;


// // export const { GET, POST } = authInstance;

// // Export the handlers
// // export const { GET, POST } = authInstance;

// // Export middleware function for Next.js
// // export const middleware = authInstance.$middleware || authInstance.handle || authInstance;