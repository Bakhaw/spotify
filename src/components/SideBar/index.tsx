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
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.text}
                className="w-full justify-start"
                disabled={route.disabled}
                size="sm"
                variant={pathname === route.href ? "secondary" : "ghost"}
              >
                <Link className="flex items-center w-full" href={route.href}>
                  <div className="mr-2">{route.icon}</div>
                  <span>{route.text}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="space-y-2">
            <Playlists />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
