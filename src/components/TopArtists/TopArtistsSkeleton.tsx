import { Skeleton } from "@/components/ui/skeleton";

function TopArtistsSkeleton() {
  const fakeTopArtists = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="px-8">
      <h1 className="mb-4 text-3xl font-bold lowercase">top artists</h1>

      <ul className="flex gap-5">
        {fakeTopArtists.map((d) => (
          <div key={d} className="flex flex-col gap-3">
            <Skeleton className="h-[200px] w-[200px] rounded-3xl" />
            <Skeleton className="h-3 w-16 ml-2" />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TopArtistsSkeleton;
