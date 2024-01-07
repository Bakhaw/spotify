"use client";

import Image, { StaticImageData } from "next/image";

import Container from "@/components/Container";
import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";

import fb1 from "@/assets/FB1.webp";
import fb2 from "@/assets/FB2.jpg";
import fb3 from "@/assets/FB3.jpg";
import fb4 from "@/assets/FB4.jpg";

const Home = () => {
  function getRandomImage(images: StaticImageData[]): StaticImageData {
    const randomIndex = Math.floor(Math.random() * images.length);

    return images[randomIndex];
  }

  const images = [fb1, fb2, fb3, fb4];
  const image = getRandomImage(images);

  return (
    <Container>
      <Image
        className="absolute blur-[200px] w-full max-h-[300px] z-[-2] object-cover top-0 right-0 opacity-90"
        alt="blur-background"
        src={"https://i.scdn.co/image/ab6761610000e5ebd308bf91fbbf4c9cf8cecc05"}
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
