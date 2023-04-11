import {
  HomeIcon,
  MagnifyingGlassIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

function SideBar() {
  const links = [
    {
      label: "Home",
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      label: "Search",
      icon: <MagnifyingGlassIcon className="h-6 w-6" />,
    },
    {
      label: "Your Library",
      icon: <MusicalNoteIcon className="h-6 w-6" />,
    },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-2 border-b-0 border-red-50 p-2">
      <ul className="flex items-center justify-around">
        {links.map((link, index) => (
          <li
            className="flex flex-col items-center justify-center gap-1"
            key={index}
          >
            {link.icon}
            <span>{link.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideBar;
