import { LuLibrary } from "react-icons/lu";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { PiVinylRecord } from "react-icons/pi";
import { GoHome } from "react-icons/go";

const routes = [
  {
    href: "/",
    icon: <GoHome className="h-full w-full" />,
    text: "Home",
  },
  {
    href: "/search",
    icon: <HiOutlineSquares2X2 className="h-full w-full" />,
    text: "Browse",
  },
  {
    href: "/library",
    icon: <LuLibrary className="h-full w-full" />,
    text: "Library",
  },
  {
    href: "/studio",
    icon: <PiVinylRecord className="h-full w-full" />,
    text: "Studio",
  },
];

export default routes;
