import { Skeleton } from "@/components/ui/skeleton";

function TopTracksSkeleton() {
  const fakeTopTracks = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold lowercase">top tracks</h1>

      <ul className="flex flex-col gap-6">
        {fakeTopTracks.map((d) => (
          <div key={d}>
            <Skeleton className="flex justify-between items-center rounded-xl h-14 w-full transition-colors" />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TopTracksSkeleton;
