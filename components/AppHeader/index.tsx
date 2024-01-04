import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import UserNav from "@/components/UserNav";

function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <div className="flex justify-between items-center p-4 sm:px-8">
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
