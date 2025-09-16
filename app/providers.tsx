import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TRPCProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const Providers = ({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<
  typeof NextThemesProvider
>) => {
  return (
    <ClerkProvider>
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
