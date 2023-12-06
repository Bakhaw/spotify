import Image from "next/image";
import classNames from "classnames";

import CoverFallback from "../../assets/cover-fallback.svg";

interface CoverProps {
  alt: string;
  priority?: boolean; // default: false
  rounded?: boolean;
  size?: "xs" | "small" | "medium" | "large"; // default: "medium"
  src: string | null | undefined;
}

const Cover: React.FC<CoverProps> = ({
  alt,
  priority,
  rounded,
  size = "medium",
  src,
}) => {
  const sizes = {
    xs: "h-[48px] w-[48px]",
    small: "h-[60px] w-[60px]",
    medium: "h-[200px] w-[200px]",
    large: "h-[300px] w-[300px]",
  };

  return (
    <Image
      alt={alt}
      className={classNames(
        `block object-cover rounded-md ${sizes[size]}`,
        rounded && "rounded-full"
      )}
      priority={priority}
      src={src ?? CoverFallback}
      height={640}
      width={640}
    />
  );
};

export default Cover;
