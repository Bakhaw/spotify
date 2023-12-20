import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserNav() {
  const { data } = useSession();
  const pathname = usePathname();

  if (!data || pathname === "/studio") return null;

  async function handleLogoutButtonClick() {
    await signOut();
  }

  if (!data.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          size="sm"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={data.user.image ?? ""}
              alt={data.user.name ?? ""}
            />
            <AvatarFallback>me</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-16" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{data.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              @{data.user?.name}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer" role="link">
            Profile
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogoutButtonClick}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
