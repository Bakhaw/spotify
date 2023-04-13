import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

import SignOut from "../SignOut";
import { useRouter } from "next/router";

function Navigation() {
  const { data: session, status } = useSession();

  const links = [
    {
      href: "/",
      icon: <HomeIcon className="h-6 w-6" />,
      label: "Home",
    },
    {
      href: "/search",
      icon: <MagnifyingGlassIcon className="h-6 w-6" />,
      label: "Search",
    },
    {
      href: "/library",
      icon: <MusicalNoteIcon className="h-6 w-6" />,
      label: "Your Library",
    },
  ];
  const router = useRouter();

  return (
    <nav className="h-screen w-52 bg-[#2d2e37] p-2">
      <ul className="flex flex-col gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            className="flex items-center justify-start gap-1"
            href={link.href}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
        <li>
          <SignOut />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
