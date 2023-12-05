import { Skeleton } from "@/components/ui/skeleton";

function HorizontalSliderSkeleton() {
  const mockItems = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <ul className="flex gap-5 px-8">
      {mockItems.map((d) => (
        <div key={d} className="flex flex-col gap-3">
          <Skeleton className="h-[200px] w-[200px] rounded-3xl" />
          <Skeleton className="h-3 w-16 ml-2" />
        </div>
      ))}
    </ul>
  );
}

export default HorizontalSliderSkeleton;
