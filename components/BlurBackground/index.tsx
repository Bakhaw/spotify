"use client";

import Image, { StaticImageData } from "next/image";

import fb1 from "@/public/FB1.webp";
import fb2 from "@/public/FB2.jpg";
import fb3 from "@/public/FB3.jpg";
import fb4 from "@/public/FB4.jpg";

function BlurBackground() {
  const sessionStorageImage =
    typeof window !== "undefined"
      ? sessionStorage?.getItem("blur-background")
      : undefined;

  function getRandomImage(images: StaticImageData[]): StaticImageData | string {
    if (sessionStorageImage) return sessionStorageImage;

    const randomIndex = Math.floor(Math.random() * images.length);

    if (typeof window !== "undefined") {
      sessionStorage?.setItem("blur-background", images[randomIndex].src);
    }

    return images[randomIndex];
  }

  const images = [fb1, fb2, fb3, fb4];
  const image = getRandomImage(images);

  return (
    <Image
      className="absolute blur-3xl w-full max-h-[300px] z-[-2] object-cover top-0 right-0 opacity-90"
      alt="blur-background"
      src={sessionStorageImage ? sessionStorageImage : image}
      height={300}
      width={300}
      priority={true}
    />
  );
}

export default BlurBackground;
