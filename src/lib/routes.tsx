import { LibraryIcon, MusicIcon, SearchIcon, SpeakerIcon } from "lucide-react";

const routes = [
  {
    href: "/",
    icon: <MusicIcon className="h-5 w-5" />,
    text: "Listen Now",
  },
  {
    href: "/search",
    icon: <SearchIcon className="h-5 w-5" />,
    text: "Browse",
  },
  {
    href: "/studio",
    icon: <SpeakerIcon className="h-5 w-5" />,
    text: "Studio",
  },
  {
    href: "/library",
    icon: <LibraryIcon className="h-5 w-5" />,
    text: "Library",
  },
];

export default routes;
