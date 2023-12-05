import { usePathname } from "next/navigation";
import Link from "next/link";

import routes from "@/lib/routes";

import { Button } from "@/components/ui/button";

import Playlists from "./Playlists";

function SideBar() {
  const pathname = usePathname();

  if (pathname === "/studio" || pathname === "/login") return null;

  return (
    <div className="fixed top-0 overflow-x-hidden bottom-[80px] w-[266px]">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            discover
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link className="block" key={route.text} href={route.href}>
                <Button
                  variant={pathname === route.href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                >
                  <div className="mr-2">{route.icon}</div>
                  <span>{route.text}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            playlists
          </h2>
          <div className="space-y-2">
            <Playlists />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
