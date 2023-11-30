import { usePathname } from "next/navigation";
import Link from "next/link";

import routes from "@/lib/routes";

import { Button } from "@/components/ui/button";

function SideBar() {
  const pathname = usePathname();

  return (
    <div className="fixed h-auto w-[266px]">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link key={route.text} href={route.href}>
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
    </div>
  );
}

export default SideBar;
