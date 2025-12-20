import { betterAuth } from "better-auth";

// Define user roles
const authInstance = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-change-in-production",
  database: {
    provider: "sqlite",
    url: process.env.DATABASE_URL || "./db.sqlite",
  },
  // Custom user fields for roles
  user: {
    additionalFields: {
      role: {
        type: "string",
        required:true,
        default: "user"  // Default role is user
      }
    }
  },
  plugins: [
    // Add any additional plugins here
  ]
});

// Export the auth instance
export const auth = authInstance;
// export const { GET, POST } = authInstance;

// Export the handlers
// export const { GET, POST } = authInstance;

// Export middleware function for Next.js
// export const middleware = authInstance.$middleware || authInstance.handle || authInstance;