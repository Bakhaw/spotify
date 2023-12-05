import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";

function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <div className="flex justify-between items-center px-8 py-4">
      <div className="flex gap-2">
        <button
          aria-label="Navigate to the previous page"
          className="hover:opacity-75"
          onClick={router.back}
          role="navigation"
        >
          <ChevronLeftCircleIcon className="h-6 w-6" />
        </button>

        <button
          aria-label="Navigate to the next page"
          className="hover:opacity-75"
          onClick={router.forward}
          role="navigation"
        >
          <ChevronRightCircleIcon className="h-6 w-6" />
        </button>
      </div>

      <ThemeToggle />
    </div>
  );
}

export default AppHeader;
