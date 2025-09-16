import { Toaster } from "@/components/ui/sonner";
import { TRPCProvider } from "@/trpc/client";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Providers = ({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<
  typeof NextThemesProvider
>) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadcn
      }}
    >
      <NextThemesProvider {...props}>
        <TRPCProvider>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 4000
            }}
          />
        </TRPCProvider>
      </NextThemesProvider>
    </ClerkProvider>
  );
};

export default Providers;
