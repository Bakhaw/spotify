import { Skeleton } from "@/components/ui/skeleton";

function TrackListSkeleton({ length = 8 }: { length?: number }) {
  const mockItems = Array.from(Array(length));

  return (
    <ul className="flex flex-col gap-5">
      {mockItems.map((d, i) => (
        <div key={i}>
          <Skeleton className="flex justify-between items-center rounded-none h-14 w-full bg-muted transition-colors" />
        </div>
      ))}
    </ul>
  );
}

export default TrackListSkeleton;
