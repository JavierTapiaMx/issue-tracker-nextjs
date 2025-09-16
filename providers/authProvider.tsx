"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

// Configuration object for Clerk appearance
const clerkAppearance = {
  baseTheme: shadcn
} as const;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>;
};
