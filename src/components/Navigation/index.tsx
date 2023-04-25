import { useRouter } from "next/router";
import Link from "next/link";
import {
  CloudIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MusicalNoteIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

function Navigation() {
  const router = useRouter();

  if (router.asPath === "/login" || router.asPath === "/studio") return null;

  const links = [
    {
      href: "/",
      icon: <HomeIcon className="h-5 w-5" />,
      label: "Home",
    },
    {
      href: "/search",
      icon: <MagnifyingGlassIcon className="h-5 w-5" />,
      label: "Search",
    },
    {
      href: "/library",
      icon: <MusicalNoteIcon className="h-5 w-5" />,
      label: "Library",
    },
    {
      href: "/studio",
      icon: <CloudIcon className="h-5 w-5" />,
      label: "Studio (bêta)",
    },
    {
      href: "/account",
      icon: <UserIcon className="h-5 w-5" />,
      label: "Account",
    },
  ];

  return (
    <nav className="h-16 bg-[#2d2e37]">
      <ul className="h-16 flex justify-around items-center">
        {links.map((link, index) => (
          <Link
            key={index}
            className="flex flex-col justify-center items-center gap-1"
            href={link.href}
          >
            {link.icon}
            <h1 className="text-sm">{link.label}</h1>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
