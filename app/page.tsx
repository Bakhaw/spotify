"use client";

import Image from "next/image";

import Container from "@/components/Container";
import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";
import useTopArtists from "@/hooks/useTopArtists";

const Home = () => {
  const topArtists = useTopArtists("short_term");

  const randomTopArtistImage =
    typeof window !== "undefined"
      ? sessionStorage.getItem("randomTopArtistImage")
      : undefined;

  function getRandomImageUrl(
    topArtists: SpotifyApi.UsersTopArtistsResponse
  ): string {
    // Check if topArtists and items array exist
    if (randomTopArtistImage) return "";

    if (topArtists && topArtists.items && topArtists.items.length > 0) {
      // Get a random artist from the list
      const randomIndex = Math.floor(Math.random() * topArtists.items.length);
      const randomArtist = topArtists.items[randomIndex];

      // Get the random artist's images array
      const artistImages = randomArtist.images;

      // Filter images with height 640
      const images640 = artistImages.filter((image) => image.height === 640);

      // Check if there are any images with height 640
      if (images640.length > 0) {
        // Randomly select an image URL
        const randomImageIndex = Math.floor(Math.random() * images640.length);

        sessionStorage.setItem(
          "randomTopArtistImage",
          images640[randomImageIndex].url
        );
        return images640[randomImageIndex].url;
      }
    }

    // Return a default image URL if no valid image is found
    return "https://i.scdn.co/image/ab6761610000e5ebd308bf91fbbf4c9cf8cecc05";
  }

  return (
    <Container>
      <Image
        className="absolute blur-3xl w-full max-h-[400px] z-[-2] object-cover top-0 right-0 opacity-90"
        alt="blur-background"
        src={
          randomTopArtistImage
            ? randomTopArtistImage
            : getRandomImageUrl(topArtists)
        }
        height={300}
        width={300}
        priority={true}
      />

      <div className="space-y-8">
        <TopArtists />
        <TopTracks />
      </div>
    </Container>
  );
};

export default Home;
