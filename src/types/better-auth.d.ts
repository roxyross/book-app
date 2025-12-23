// src/types/better-auth.d.ts
declare module "better-auth/types" {
  interface User {
    role: string;
  }

  interface Session {
    user: User & {
      role: string;
    };
  }
}