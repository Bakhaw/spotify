import Link from "next/link";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { cn } from "@/lib/utils";

import Cover from "@/components/Cover";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import HorizontalSliderSkeleton from "./HorizontalSliderSkeleton";

interface HorizontalSliderProps {
  className?: string;
  items:
    | SpotifyApi.ArtistObjectFull[]
    | SpotifyApi.AlbumObjectFull[]
    | SpotifyApi.AlbumObjectSimplified[];
  title?: string;
  type: "artist" | "album";
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  className,
  items,
  title,
  type,
}) => {
  return (
    <>
      {items ? (
        <div className={cn("space-y-2 -mx-8", className)}>
          {title && <h1 className="text-3xl font-bold lowercase">{title}</h1>}

          <Carousel
            plugins={[WheelGesturesPlugin()]}
            opts={{
              skipSnaps: true,
            }}
          >
            <CarouselContent className="pl-12 gap-2">
              {items.map((item, index) => (
                <Link key={item.id} href={`/${type}/${item.id}`}>
                  <CarouselItem
                    className={cn(
                      "space-y-2 h-full w-40 sm:w-52 p-3 rounded-lg bg-hover/10 hover:bg-hover transition-all duration-300",
                      index === items.length - 1 && "mr-8 sm:mr-2"
                    )}
                  >
                    <Cover
                      alt={`${item.name} cover`}
                      priority={index === 0}
                      additionalCss="h-[150px] w-[150px] sm:h-[200px] sm:w-[200px]"
                      src={item.images?.[0]?.url}
                    />

                    <h2 className="line-clamp-3">
                      {index + 1}. {item.name}
                    </h2>
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
