import Image from "next/image";
import classNames from "classnames";

import CoverFallback from "../../assets/cover-fallback.svg";

interface CoverProps {
  rounded?: boolean;
  size?: "small" | "medium" | "large"; // default: "medium"
  square?: boolean; // removes border-radius
  src: string | null | undefined;
}

const Cover: React.FC<CoverProps> = ({
  rounded,
  size = "medium",
  square,
  src,
}) => {
  const sizes = {
    small: "h-[60px] w-[60px]",
    medium: "h-[200px] w-[200px]",
    large: "h-[300px] w-[300px]",
  };

  return (
    <Image
      alt="Cover"
      className={classNames(
        `block object-cover rounded-3xl ${sizes[size]}`,
        rounded && "rounded-full",
        square && "rounded-none"
      )}
      src={src ?? CoverFallback}
      height={640}
      width={640}
    />
  );
};

export default Cover;
