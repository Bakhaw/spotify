import { NextPage } from "next";
import { NextSeo } from "next-seo";

import CustomLink from "@/components/CustomLink";

const Library: NextPage = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      <NextSeo title="music app - library" description="music app - library" />
      <CustomLink href="/library/saved-tracks" label="saved tracks" />
      <CustomLink href="/library/playlists" label="playlists" />
    </div>
  );
};

export default Library;
