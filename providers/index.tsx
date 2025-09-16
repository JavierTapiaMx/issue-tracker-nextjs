"use client";

import { AuthProvider } from "./authProvider";
import { ThemeProvider } from "./themeProvider";
import { TrpcProvider } from "./trpcProvider";
import { ToastProvider } from "./toastProvider";

export const Providers = ({
  children,
  ...themeProps
}: {
  children: React.ReactNode;
} & React.ComponentProps<typeof ThemeProvider>) => {
  return (
    <AuthProvider>
      <ThemeProvider {...themeProps}>
        <TrpcProvider>
          {children}
          <ToastProvider />
        </TrpcProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

// Export individual providers for flexibility
export { AuthProvider } from "./authProvider";
export { ThemeProvider } from "./themeProvider";
export { TrpcProvider } from "./trpcProvider";
export { ToastProvider } from "./toastProvider";
