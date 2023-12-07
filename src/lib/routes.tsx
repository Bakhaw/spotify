import { LuLibrary, LuMusic2 } from "react-icons/lu";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { PiVinylRecord } from "react-icons/pi";

const routes = [
  {
    href: "/",
    icon: <LuMusic2 className="h-4 w-4" />,
    text: "Listen Now",
  },
  {
    disabled: true,
    href: "/search",
    icon: <HiOutlineSquares2X2 className="h-4 w-4" />,
    text: "Browse",
  },
  {
    href: "/library",
    icon: <LuLibrary className="h-5 w-5" />,
    text: "Library",
  },
  {
    href: "/studio",
    icon: <PiVinylRecord className="h-5 w-5" />,
    text: "Studio",
  },
];

export default routes;
