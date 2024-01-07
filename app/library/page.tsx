import { NextPage } from "next";

import Container from "@/components/Container";
import CustomLink from "@/components/CustomLink";

const Library: NextPage = () => {
  return (
    <Container>
      <div className="space-y-2">
        <CustomLink href="/library/saved-tracks" label="saved tracks" />
        <CustomLink href="/library/playlists" label="playlists" />
      </div>
    </Container>
  );
};

export default Library;
