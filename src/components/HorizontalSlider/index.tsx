import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Cover from "../Cover";

interface HorizontalSliderProps {
  items: SpotifyApi.ArtistObjectFull[] | SpotifyApi.AlbumObjectFull[];
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
      <h1 className="px-8 mb-4 text-3xl">{title}</h1>

      <Swiper slidesPerView="auto" spaceBetween={20} speed={1000}>
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/${type}/${item.id}`}>
              <Cover src={item.images[0].url} />
              <div>{item.name}</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HorizontalSlider;
