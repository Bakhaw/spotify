import Link from "next/link";
import SwiperCore, { FreeMode, Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Cover from "@/components/Cover";

import HorizontalSliderSkeleton from "./HorizontalSliderSkeleton";

import "swiper/css";

SwiperCore.use([FreeMode, Keyboard, Mousewheel]);

interface HorizontalSliderProps {
  items:
    | SpotifyApi.ArtistObjectFull[]
    | SpotifyApi.AlbumObjectFull[]
    | SpotifyApi.AlbumObjectSimplified[];
  type: "artist" | "album";
  title: string;
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  items,
  type,
  title,
}) => {
  return (
    <div className="w-full">
      {items?.length !== 0 && (
        <h1 className="pr-8 pl-3 mb-[6px] text-3xl font-bold lowercase">
          {title}
        </h1>
      )}

      {items ? (
        <Swiper
          keyboard
          slidesPerView="auto"
          mousewheel={{ forceToAxis: true, sensitivity: 0.5 }}
          freeMode={{
            enabled: true,
            sticky: false,
            momentumBounce: false,
          }}
        >
          {items.map((item, i) => (
            <SwiperSlide key={item.id}>
              <Link href={`/${type}/${item.id}`}>
                <Cover
                  alt={`${item.name} cover`}
                  priority={i === 0}
                  src={item.images[0].url}
                />
                <div className="mt-1">{item.name}</div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <HorizontalSliderSkeleton />
      )}
    </div>
  );
};

export default HorizontalSlider;
