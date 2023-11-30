import { LibraryIcon, MusicIcon, SearchIcon, SpeakerIcon } from "lucide-react";

const routes = [
  {
    href: "/",
    icon: <MusicIcon className="h-5 w-5" />,
    text: "listen now",
  },
  {
    href: "/search",
    icon: <SearchIcon className="h-5 w-5" />,
    text: "browse",
  },
  {
    href: "/studio",
    icon: <SpeakerIcon className="h-5 w-5" />,
    text: "studio (beta)",
  },
  {
    href: "/library",
    icon: <LibraryIcon className="h-5 w-5" />,
    text: "library",
  },
];

export default routes;
