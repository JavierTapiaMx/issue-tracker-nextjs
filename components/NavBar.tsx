"use client";

import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const NavBar = () => {
  const pathname = usePathname();
  const { isLoaded } = useAuth();

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/",
      isActive: pathname === "/"
    },
    {
      label: "Issues",
      href: "/issues",
      isActive: pathname.startsWith("/issues")
    }
  ];

  return (
    <nav className="border-border bg-background/80 sticky top-0 z-50 flex flex-row items-center justify-between border-b px-6 py-4 shadow-sm backdrop-blur-md">
      <div className="flex flex-row items-center gap-8">
        <Link
          href="/"
          className="focus-visible:ring-ring flex items-center gap-2 rounded-lg p-1 transition-all hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
        >
          <AiFillBug className="text-primary text-3xl" />
          <span className="text-foreground hidden text-xl font-bold sm:block">
            IssueTracker
          </span>
        </Link>
        <ul className="flex flex-row items-center gap-1">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "hover:bg-accent hover:text-accent-foreground relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  item.isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
                {item.isActive && (
                  <div className="bg-primary absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row items-center gap-4">
        <ThemeToggle />
        {!isLoaded ? (
          <>
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </>
        ) : (
          <>
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm" className="cursor-pointer">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
