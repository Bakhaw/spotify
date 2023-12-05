import {
  LibraryIcon,
  MusicIcon,
  SearchIcon,
  SpeakerIcon,
  User2Icon,
} from "lucide-react";

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
    href: "/library",
    icon: <LibraryIcon className="h-5 w-5" />,
    text: "library",
  },
  {
    href: "/studio",
    icon: <SpeakerIcon className="h-5 w-5" />,
    text: "studio (beta)",
  },
  {
    href: "/profile",
    icon: <User2Icon className="h-5 w-5" />,
    text: "profile",
  },
];

export default routes;
