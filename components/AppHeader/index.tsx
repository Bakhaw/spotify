import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import classNames from "classnames";

import ThemeToggle from "@/components/ThemeToggle";
import UserNav from "@/components/UserNav";

function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <div
      className={classNames(
        "flex justify-between items-center px-8 py-4 left-0 right-0 absolute",
        pathname !== "/studio" && "sm:left-[90px] md:left-[266px]"
      )}
    >
      <div className="flex gap-2">
        <button
          aria-label="Navigate to the previous page"
          className="hover:opacity-75"
          onClick={router.back}
        >
          <ChevronLeftCircleIcon className="h-6 w-6" />
        </button>

        <button
          aria-label="Navigate to the next page"
          className="hover:opacity-75"
          onClick={router.forward}
        >
          <ChevronRightCircleIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex gap-2 justify-between items-center">
        <ThemeToggle />
        <UserNav />
      </div>
    </div>
  );
}

export default AppHeader;