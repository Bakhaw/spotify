import Link from "next/link";
import SwiperCore, { FreeMode, Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Cover from "../Cover";

import "swiper/css";
import isFullTrack from "@/lib/isFullTrack";

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
  if (items.length === 0) return null;

  return (
    <div className="w-full">
      <h1 className="px-8 mb-4 text-3xl font-bold lowercase">{title}</h1>

      <Swiper
        keyboard
        slidesPerView="auto"
        spaceBetween={20}
        mousewheel={{ forceToAxis: true, sensitivity: 0.5 }}
        freeMode={{
          enabled: true,
          sticky: false,
          momentumBounce: false,
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/${type}/${item.id}`}>
              <Cover alt={item.name} src={item.images[0].url} />
              <div>{item.name}</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HorizontalSlider;
