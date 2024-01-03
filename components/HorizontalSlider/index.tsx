import Link from "next/link";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import Cover from "@/components/Cover";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import HorizontalSliderSkeleton from "./HorizontalSliderSkeleton";

interface HorizontalSliderProps {
  items:
    | SpotifyApi.ArtistObjectFull[]
    | SpotifyApi.AlbumObjectFull[]
    | SpotifyApi.AlbumObjectSimplified[];
  title?: string;
  type: "artist" | "album";
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  items,
  title,
  type,
}) => {
  return (
    <>
      {items ? (
        <div className="space-y-2">
          {title && <h1 className="text-3xl font-bold lowercase">{title}</h1>}

          <Carousel
            plugins={[WheelGesturesPlugin()]}
            opts={{
              skipSnaps: true,
            }}
          >
            <CarouselContent className="pl-4 space-x-2">
              {items.map((item, index) => (
                <Link key={item.id} href={`/${type}/${item.id}`}>
                  <CarouselItem className="space-y-2 basis-auto h-full w-52 p-3 rounded-lg bg-hover/10 hover:bg-hover transition-all duration-300">
                    <Cover
                      alt={`${item.name} cover`}
                      priority={index === 0}
                      src={item.images?.[0]?.url}
                    />

                    <h2 className="line-clamp-3">{item.name}</h2>
                  </CarouselItem>
                </Link>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : (
        <HorizontalSliderSkeleton />
      )}
    </>
  );
};

export default HorizontalSlider;
