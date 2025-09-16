import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TRPCProvider } from "@/trpc/client";

const Providers = ({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<
  typeof NextThemesProvider
>) => {
  return (
    <NextThemesProvider {...props}>
      <TRPCProvider>{children}</TRPCProvider>
    </NextThemesProvider>
  );
};

export default Providers;
