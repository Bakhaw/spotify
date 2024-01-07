"use client";

import { usePlayerStore } from "@/store/usePlayerStore";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);

  // calc() values
  // 80px: Player total height
  // 96px: BottomBar total height
  // 56px: AppHeader total height

  const minHeight =
    "h-[calc(100dvh-(96px+56px+80px))] sm:h-[calc(100dvh-(56px+80px))]";
  const maxHeight = "h-[calc(100dvh-(96px+56px))] sm:h-[calc(100dvh-56px)]";

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
