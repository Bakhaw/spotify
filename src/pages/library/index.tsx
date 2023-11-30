import { NextPage } from "next";

import CustomLink from "@/components/CustomLink";

const Library: NextPage = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      <CustomLink href="/library/saved-tracks" label="saved tracks" />
      <CustomLink href="/library/playlists" label="playlists" />
    </div>
  );
};

export default Library;
