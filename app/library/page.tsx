import Container from "@/components/Container";
import CustomLink from "@/components/CustomLink";

const Library = () => {
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
