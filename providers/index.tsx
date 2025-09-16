"use client";

import { AuthProvider } from "./authProvider";
import { QueryProvider } from "./queryProvider";
import { ThemeProvider } from "./themeProvider";
import { TrpcProvider } from "./trpcProvider";
import { ToastProvider } from "./toastProvider";

export function Providers({
  children,
  ...themeProps
}: {
  children: React.ReactNode;
} & React.ComponentProps<typeof ThemeProvider>) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider {...themeProps}>
          <TrpcProvider>
            {children}
            <ToastProvider />
          </TrpcProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

// Export individual providers for flexibility
export { AuthProvider } from "./authProvider";
export { QueryProvider } from "./queryProvider";
export { ThemeProvider } from "./themeProvider";
export { TrpcProvider } from "./trpcProvider";
export { ToastProvider } from "./toastProvider";
