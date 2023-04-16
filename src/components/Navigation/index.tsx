import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

import useTrack from "@/hooks/useTrack";
import SignOut from "../SignOut";
import Playlists from "../Playlists";

function Navigation() {
  const router = useRouter();
  const track = useTrack();

  if (router.asPath === "/login") return null;

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
      label: "Library",
    },
  ];

  return (
    <nav
      className="hidden md:flex flex-col justify-between items-start gap-4 w-60 bg-[#2d2e37] p-4 overflow-x-hidden overflow-y-scroll scrollbar-hide"
      style={{
        height: track ? "calc(100vh - 80px)" : "100vh",
      }}
    >
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
      </ul>

      <Playlists />

      <SignOut />
    </nav>
  );
}

export default Navigation;
