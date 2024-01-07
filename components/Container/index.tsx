"use client";

import { usePathname } from "next/navigation";

import { usePlayerStore } from "@/store/usePlayerStore";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const pathname = usePathname();
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);

  const fullStartWithPages = ["/album", "/artist"];
  const isFeaturedPage = fullStartWithPages.some((page) =>
    pathname?.startsWith(page)
  );

  // calc() values
  // 80px: Player total height
  // 96px: BottomBar total height
  // 56px: AppHeader total height

  const featuredPageHeight = {
    min: "h-[calc(100dvh-(96px+80px))] sm:h-[calc(100dvh-80px)]",
    max: "h-[calc(100dvh-96px)] sm:h-screen",
  };

  const defaultPageHeight = {
    min: "mt-14 h-[calc(100dvh-(96px+56px+80px))] sm:h-[calc(100dvh-(56px+80px))]",
    max: "mt-14 h-[calc(100dvh-(96px+56px))] sm:h-[calc(100dvh-56px)]",
  };

  const minHeight = isFeaturedPage
    ? featuredPageHeight.min
    : defaultPageHeight.min;

  const maxHeight = isFeaturedPage
    ? featuredPageHeight.max
    : defaultPageHeight.max;

  return (
    <div
      className={cn(
        "overflow-y-scroll overflow-x-hidden",
        currentPlaybackState ? minHeight : maxHeight,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
