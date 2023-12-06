"use client";

import { Skeleton } from "@/components/ui/skeleton";

function HorizontalSliderSkeleton() {
  const mockItems = [0, 1, 2, 3, 4, 5, 6, 7];

  const generateRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <ul className="flex gap-5 px-8">
      {mockItems.map((d) => (
        <div key={d} className="flex flex-col gap-3">
          <Skeleton className="h-[200px] w-[200px]" />
          <Skeleton
            style={{ width: generateRandomNumber(40, 150) }}
            className="h-3"
          />
        </div>
      ))}
    </ul>
  );
}

export default HorizontalSliderSkeleton;
