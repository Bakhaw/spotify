import Link from "next/link";

interface CustomLinkProps {
  href: string;
  label: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, label }) => {
  return (
    <div className="flex justify-center items-center rounded-xl h-14 w-full bg-[#2d2e37] text-gray-300 overflow-hidden transition-colors hover:bg-[#666770] hover:text-white">
      <Link href={href} className="text-2xl font-bold lowercase">
        {label}
      </Link>
    </div>
  );
};

export default CustomLink;
