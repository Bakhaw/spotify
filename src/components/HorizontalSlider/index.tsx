import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

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
    <div className="flex flex-col w-full">
      <h1>{title}</h1>

      <Swiper
        className="border-2 border-red-300"
        slidesPerView="auto"
        spaceBetween={20}
        speed={700}
      >
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
