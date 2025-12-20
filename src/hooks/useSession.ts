"use client";

import { createAuthClient } from "better-auth/react";
import { useEffect, useState } from "react";

// Create the auth client
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  fetchOptions: {
    // Additional fetch options if needed
  }
});

export const { signIn, signOut, useSession } = authClient;