import { betterAuth } from "better-auth";

let authInstance;
// if (process.env.VERCEL_ENV === 'production' && !process.env.DATABASE_URL) {
//   // For Vercel production without DB, create minimal instance
//   authInstance = betterAuth({
//     secret: process.env.BETTER_AUTH_SECRET || "fallback-secret",
//     // No database for serverless compatibility
//   });
// } else {
  // Configuration for PostgreSQL database
  authInstance = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET || "1KLLkSc9zISlUgF5y/gvxll8ZuZToUecY030a1RrmTg=",
    database: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_p6ehnC3avcoQ@ep-snowy-boat-ahacpm9f-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
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
// }

export const auth = authInstance;


// // export const { GET, POST } = authInstance;

// // Export the handlers
// // export const { GET, POST } = authInstance;

// // Export middleware function for Next.js
// // export const middleware = authInstance.$middleware || authInstance.handle || authInstance;