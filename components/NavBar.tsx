import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" }
  ];

  return (
    <nav className="flex flex-row items-center gap-8 border-b p-4">
      <Link href="/">
        <AiFillBug className="text-2xl" />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-500 transition-colors hover:text-gray-800"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
