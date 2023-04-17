import Link from "next/link";

function Library() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex justify-center items-center rounded-xl h-14 w-full bg-[#2d2e37] text-gray-300 overflow-hidden transition-colors hover:bg-[#666770] hover:text-white">
        <Link
          href="/library/saved-tracks"
          className="text-2xl font-bold lowercase"
        >
          saved tracks
        </Link>
      </div>

      <div className="flex justify-center items-center rounded-xl h-14 w-full bg-[#2d2e37] text-gray-300 overflow-hidden transition-colors hover:bg-[#666770] hover:text-white">
        <Link
          href="/library/playlists"
          className="text-2xl font-bold lowercase"
        >
          playlists
        </Link>
      </div>
    </div>
  );
}

export default Library;
