import classNames from "classnames";

interface CoverProps {
  rounded?: boolean;
  size?: "small" | "medium" | "large"; // default: "medium"
  square?: boolean; // removes border-radius
  src: string | null;
}

const Cover: React.FC<CoverProps> = ({
  rounded,
  size = "medium",
  square,
  src,
}) => {
  const srcFallback = "https://placehold.co/600x400/060606/bfbfbf?text=?";

  const sizes = {
    small: "h-[60px] w-[60px]",
    medium: "h-[200px] w-[200px]",
    large: "h-[300px] w-[300px]",
  };

  return (
    <img
      alt="Cover"
      className={classNames(
        `block object-cover rounded-3xl ${sizes[size]}`,
        rounded && "rounded-full",
        square && "rounded-none"
      )}
      src={src ?? srcFallback}
    />
  );
};

export default Cover;
