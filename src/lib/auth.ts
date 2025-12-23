// import { betterAuth } from "better-auth";

// // For Vercel serverless deployment, we need to handle the database differently
// // SQLite doesn't work well in serverless environments, so we need to use a database URL
// const authInstance = betterAuth({
//   secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-change-in-production",
//   database: {
//     provider: "sqlite",
//     url: process.env.DATABASE_URL || "./db.sqlite",
//   },
//   // Custom user fields for roles
//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         required: true,
//         default: "user"  // Default role is user
//       }
//     }
//   },
//   plugins: [
//     // Add any additional plugins here
//   ]
// });

// // Export the auth instance
// export const auth = authInstance;
import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: false,
  },
});

let authInstance;
if (process.env.VERCEL_ENV === 'production' && !process.env.DATABASE_URL) {
  // For Vercel production without DB, create minimal instance
  authInstance = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET || "fallback-secret",
    // No database for serverless compatibility
  });
} else {
  // Normal configuration for local development
  authInstance = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-change-in-production",
    database: {
      provider: "postgres",
      url: process.env.DATABASE_URL!,
      pool,
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