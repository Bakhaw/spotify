import Link from "next/link";

import { ToastAction } from "@/components/ui/toast";

function addToPlaylistToast(playlistId: string) {
  return {
    action: (
      <ToastAction altText="See changes">
        <Link href={`/playlist/${playlistId}`} className="text-xs mr-2">
          See changes
        </Link>
      </ToastAction>
    ),
    title: "Added to your playlist !",
    duration: 2200,
  };
}

export default addToPlaylistToast;
