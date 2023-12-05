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
        <button className="hover:opacity-75" onClick={router.back}>
          <ChevronLeftCircleIcon className="h-6 w-6" />
        </button>

        <button className="hover:opacity-75" onClick={router.forward}>
          <ChevronRightCircleIcon className="h-6 w-6" />
        </button>
      </div>

      <ThemeToggle />
    </div>
  );
}

export default AppHeader;
