import { usePathname } from "next/navigation";
import Link from "next/link";

import { LuLibrary } from "react-icons/lu";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { PiVinylRecord, PiVinylRecordFill } from "react-icons/pi";

import { GoHome, GoHomeFill } from "react-icons/go";

import { RiDashboardFill, RiDashboardLine } from "react-icons/ri";
import { IoLibraryOutline, IoLibrary } from "react-icons/io5";

import { Button } from "@/components/ui/button";

function BottomBar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      icon:
        pathname === "/" ? (
          <GoHomeFill className="h-full w-full" />
        ) : (
          <GoHome className="h-full w-full" />
        ),
      text: "Home",
    },
    {
      href: "/search",
      icon:
        pathname === "/search" ? (
          <RiDashboardFill className="h-full w-full" />
        ) : (
          <RiDashboardLine className="h-full w-full" />
        ),
      text: "Browse",
    },
    {
      href: "/library",
      icon:
        pathname === "/library" ? (
          <IoLibrary className="h-full w-full" />
        ) : (
          <IoLibraryOutline className="h-full w-full" />
        ),
      text: "Library",
    },
    {
      href: "/studio",
      icon:
        pathname === "/studio" ? (
          <PiVinylRecordFill className="h-full w-full" />
        ) : (
          <PiVinylRecord className="h-full w-full" />
        ),
      text: "Studio",
    },
  ];

  if (pathname === "/studio" || pathname === "/login") return null;

  return (
    <div className="h-full p-2 bg-primary px-4 pb-2">
      <div className="flex gap-3 items-center justify-evenly">
        {routes.map((route) => (
          <Button
            key={route.text}
            className="py-1 h-full w-full hover:bg-inherit"
            size="sm"
            variant="ghost"
          >
            <Link
              className="flex flex-col items-center space-y-1"
              href={route.href}
            >
              <div className="h-5 w-5">{route.icon}</div>
              <div className="text-xs">{route.text}</div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default BottomBar;
