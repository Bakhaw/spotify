import { Skeleton } from "@/components/ui/skeleton";

function TrackListHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-5">
      <Skeleton className="h-[200px] w-[200px] rounded-3xl" />

      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-72 mb-10" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  );
}

export default TrackListHeaderSkeleton;
