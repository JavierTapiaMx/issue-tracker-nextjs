import { TRPCProvider } from "@/trpc/client";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <TRPCProvider>{children}</TRPCProvider>;
};

export default Providers;
