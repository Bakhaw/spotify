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
  // 80px: BottomBar total height
  // 80px: Player total height
  // 56px: AppHeader total height

  const minHeight =
    "h-[calc(100dvh-(80px+80px+56px))] sm:h-[calc(100dvh-(80px+56px))]";
  const maxHeight = "h-[calc(100dvh-(80px+56px))] sm:h-[calc(100dvh-56px)]";

  return (
    <div
      className={cn(
        "mt-14 px-4 sm:px-8 py-4 overflow-y-scroll overflow-x-hidden",
        currentPlaybackState ? minHeight : maxHeight,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
