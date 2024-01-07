import Image from "next/image";

import { cn } from "@/lib/utils";

import CoverFallback from "../../assets/cover-fallback.svg";

interface CoverProps {
  alt: string;
  additionalCss?: string;
  priority?: boolean; // default: false
  rounded?: boolean;
  size?: "full" | "small" | "medium" | "large"; // default: "medium"
  src: string | null | undefined;
}

const Cover: React.FC<CoverProps> = ({
  alt,
  additionalCss,
  priority,
  rounded,
  size = "medium",
  src,
}) => {
  const sizes = {
    full: "h-full w-full",
    small: "h-[60px] w-[60px]",
    medium: "h-[200px] w-[200px]",
    large: "h-[300px] w-[300px]",
  };

  return (
    <Image
      alt={alt}
      className={cn(
        `block object-cover z-0 ${sizes[size]}`,
        rounded && "rounded-full",
        additionalCss
      )}
      priority={priority}
      src={src ?? CoverFallback}
      height={640}
      width={640}
    />
  );
};

export default Cover;
