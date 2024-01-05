import { NextPage } from "next";

import CustomLink from "@/components/CustomLink";

const Library: NextPage = () => {
  return (
    <div className="space-y-2">
      <CustomLink href="/library/saved-tracks" label="saved tracks" />
      <CustomLink href="/library/playlists" label="playlists" />
    </div>
  );
};

export default Library;
