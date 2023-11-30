import { usePathname } from "next/navigation";
import Link from "next/link";
import { ListMusicIcon } from "lucide-react";

import routes from "@/lib/routes";
import usePlaylists from "@/hooks/usePlaylists";

import { Button } from "@/components/ui/button";

function SideBar() {
  const pathname = usePathname();
  const playlists = usePlaylists();

  if (pathname === "/studio") return null;

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
            {playlists?.items.map((playlist) => (
              <Link
                className="block"
                key={playlist.id}
                href={`/playlist/${playlist.id}`}
              >
                <Button
                  // variant={pathname === route.href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                >
                  <div className="mr-2">
                    <ListMusicIcon className="h-6 w-6" />
                  </div>
                  <span>{playlist.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
