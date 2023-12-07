import {
  LibraryIcon,
  MusicIcon,
  SearchIcon,
  SpeakerIcon,
  User2Icon,
} from "lucide-react";

import { LuLibrary, LuMusic2 } from "react-icons/lu";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { PiVinylRecord } from "react-icons/pi";

const routes = [
  {
    href: "/",
    icon: <LuMusic2 className="h-4 w-4" />,
    text: "listen now",
  },
  {
    disabled: true,
    href: "/search",
    icon: <HiOutlineSquares2X2 className="h-4 w-4" />,
    text: "browse",
  },
  {
    href: "/library",
    icon: <LuLibrary className="h-5 w-5" />,
    text: "library",
  },
  {
    href: "/studio",
    icon: <PiVinylRecord className="h-5 w-5" />,
    text: "studio (beta)",
  },
];

export default routes;
