import { Color } from "colorthief";

// https://stackoverflow.com/a/9780689
function isWhite(color: Color): boolean {
  const [R, G, B] = color;
  const Y = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  // if Y > 128 => white color
  // if Y < 128 => black color

  return Y > 128;
}

export default isWhite;
