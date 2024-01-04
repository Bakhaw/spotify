import { usePathname } from "next/navigation";
import Link from "next/link";

import routes from "@/lib/routes";

import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import Playlists from "./Playlists";

function SideBar() {
  const pathname = usePathname();

  if (pathname === "/studio" || pathname === "/login") return null;

  return (
    <div className="h-full p-4">
      <div className="flex flex-col gap-3 items-center justify-center @xs:items-start @xs:justify-start">
        {routes.map((route) => (
          <Button
            key={route.text}
            className="px-2 w-full"
            size="sm"
            variant={pathname === route.href ? "secondary" : "ghost"}
          >
            <Link
              className="flex items-center h-full w-full gap-4"
              href={route.href}
            >
              <div className="mx-auto @xs:mx-0 h-5 w-5">{route.icon}</div>
              <span className="hidden @xs:block">{route.text}</span>
            </Link>
          </Button>
        ))}
      </div>

      <div className="my-4">
        <DropdownMenuSeparator />
      </div>

      <div className="h-full">
        <h1 className="mb-4">Playlists</h1>
        <Playlists />
      </div>
    </div>
  );
}

export default SideBar;
