import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { cn } from "@/lib/utils";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import HorizontalSliderSkeleton from "./HorizontalSliderSkeleton";

import disqueOr from "../../assets/disqueOr.svg";
import disquePlatine from "../../assets/disquePlatine.svg";
import disqueDiamant from "../../assets/disqueDiamant.svg";

type HorizontalSliderItems =
  | SpotifyApi.ArtistObjectFull[]
  | SpotifyApi.AlbumObjectFull[]
  | SpotifyApi.AlbumObjectSimplified[]
  // | SpotifyApi.TrackObjectFull[]
  | SpotifyApi.PlaylistObjectSimplified[];

interface HorizontalSliderProps {
  className?: string;
  items?: HorizontalSliderItems;
  type: "artist" | "album" | "playlist";
  rankIcons?: boolean;
  showArtistName?: boolean; // default true
}

interface HorizontalSliderComposition {
  Skeleton: typeof HorizontalSliderSkeleton;
}

const HorizontalSlider: React.FC<HorizontalSliderProps> &
  HorizontalSliderComposition = ({
  className,
  items,
  type,
  rankIcons,
  showArtistName = true,
}) => {
  const imageSources = [disqueDiamant, disquePlatine, disqueOr];

  const sanitizedItems = useMemo(
    () => items?.filter((item) => item !== null),
    [items]
  );

  return (
    <>
      {sanitizedItems ? (
        <div className={cn("space-y-2 -mx-8", className)}>
          <Carousel
            plugins={[WheelGesturesPlugin()]}
            opts={{
              skipSnaps: true,
            }}
          >
            <CarouselContent className="pl-12 gap-2">
              {sanitizedItems.map((item, index) => (
                <Link key={item.id} href={`/${type}/${item.id}`}>
                  <CarouselItem
                    className={cn(
                      "flex flex-col gap-1 h-full w-40 sm:w-52 p-3 rounded-lg bg-hover/10 hover:bg-hover transition-all duration-300",
                      index === sanitizedItems.length - 1 && "mr-8 sm:mr-2"
                    )}
                  >
                    <Cover
                      alt={`${item.name} cover`}
                      priority={index === 0}
                      additionalCss="h-[150px] w-[150px] sm:h-[200px] sm:w-[200px]"
                      src={item.images?.[0]?.url}
                    />
                    {rankIcons ? (
                      <div className="flex justify-between items-center">
                        <h2 className="line-clamp-3">
                          {index + 1}. {item.name}
                        </h2>
                        {index < imageSources.length && (
                          <Image
                            src={imageSources[index]}
                            alt={imageSources[index]}
                            height={30}
                            width={30}
                          />
                        )}
                      </div>
                    ) : (
                      <>
                        <h2 className="line-clamp-2">{item.name}</h2>

                        <div className="mt-auto">
                          {showArtistName && "artists" in item && (
                            <ArtistLink artists={item.artists} />
                          )}

                          {"release_date" in item && (
                            <h2>{item.release_date.split("-")[0]}</h2>
                          )}
                        </div>
                      </>
                    )}
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

HorizontalSlider.Skeleton = HorizontalSliderSkeleton;

export default HorizontalSlider;
