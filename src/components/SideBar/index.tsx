import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import classNames from "classnames";

import { isPlayingState } from "@/atoms/trackAtom";
import routes from "@/lib/routes";

import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import Playlists from "./Playlists";

function SideBar() {
  const pathname = usePathname();
  const isPlaying = useRecoilValue(isPlayingState);

  if (pathname === "/studio" || pathname === "/login") return null;

  return (
    <div
      className={classNames(
        "fixed top-0 overflow-x-hidden sm:w-[96px] md:w-[266px] p-4",
        isPlaying ? "bottom-[80px]" : "bottom-0"
      )}
    >
      <div className="flex flex-col gap-3 items-center justify-center md:items-start md:justify-start">
        {routes.map((route) => (
          <Button
            key={route.text}
            className="px-2 w-full"
            disabled={route.disabled}
            size="sm"
            variant={pathname === route.href ? "secondary" : "ghost"}
          >
            <Link
              className="flex items-center h-full w-full gap-4"
              href={route.href}
            >
              <div className="mx-auto md:mx-0">{route.icon}</div>
              <span className="hidden md:block">{route.text}</span>
            </Link>
          </Button>
        ))}
      </div>

      <div className="my-4">
        <DropdownMenuSeparator />
      </div>

      <Playlists />
    </div>
  );
}

export default SideBar;
