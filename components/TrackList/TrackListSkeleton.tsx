import { Skeleton } from "@/components/ui/skeleton";

function TrackListSkeleton() {
  const mockItems = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <ul className="flex flex-col gap-5">
      {mockItems.map((d) => (
        <div key={d}>
          <Skeleton className="flex justify-between items-center rounded-none h-14 w-full bg-muted transition-colors" />
        </div>
      ))}
    </ul>
  );
}

export default TrackListSkeleton;
