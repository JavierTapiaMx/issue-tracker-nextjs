"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const pathname = usePathname();

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/",
      isActive: pathname === "/"
    },
    {
      label: "Issues",
      href: "/issues",
      isActive: pathname === "/issues"
    }
  ];

  return (
    <nav className="flex flex-row items-center gap-8 border-b p-4">
      <Link href="/">
        <AiFillBug className="text-2xl" />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "transition-colors hover:text-gray-800",
                item.isActive ? "text-gray-900" : "text-gray-500"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
