import { usePathname } from "next/navigation";
import Link from "next/link";

import routes from "@/lib/routes";

import { Button } from "@/components/ui/button";

function BottomBar() {
  const pathname = usePathname();

  if (pathname === "/studio" || pathname === "/login") return null;

  return (
    <div className="h-full p-2 bg-primary">
      <div className="flex gap-3 items-center justify-evenly">
        {routes.map((route) => (
          <Button
            key={route.text}
            className="py-1 h-full w-full"
            size="sm"
            variant={pathname === route.href ? "secondary" : "ghost"}
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
