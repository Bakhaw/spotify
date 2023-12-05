import { Skeleton } from "@/components/ui/skeleton";

function PlaylistsSkeleton() {
  const fakePlaylists = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <ul className="flex flex-col gap-5">
      {fakePlaylists.map((d) => (
        <div key={d} className="flex flex-col gap-3">
          <Skeleton className="h-11 w-full" />
        </div>
      ))}
    </ul>
  );
}

export default PlaylistsSkeleton;
