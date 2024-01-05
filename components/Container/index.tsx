"use client";

import { usePathname } from "next/navigation";

import { usePlayerStore } from "@/store/usePlayerStore";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const pathname = usePathname();
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);

  const fullStartWithPages = ["/album", "/artist"];
  const isFeaturedPage = fullStartWithPages.some((page) =>
    pathname?.startsWith(page)
  );

  // calc() values
  // 80px: Player total height
  // 64px: BottomBar total height
  // 56px: AppHeader total height

  return (
    <div
      className={cn(
        "overflow-y-scroll overflow-x-hidden",
        !isFeaturedPage && "mt-14 p-2 sm:px-8 sm:py-4",
        currentPlaybackState
          ? "h-[calc(100vh-(80px+56px))]"
          : isFeaturedPage
          ? "h-[calc(100vh-64px)] sm:h-screen"
          : "h-[calc(100vh-(64px+56px))] sm:h-[calc(100vh-(56px))]"
      )}
    >
      {children}
    </div>
  );
};

export default Container;
