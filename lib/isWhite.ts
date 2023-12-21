import { Color } from "colorthief";

function isWhite(color: Color): boolean {
  const [R, G, B] = color;

  // if R, G, B > 128 => white color
  // if R, G, B < 128 => black color

  return R > 200 && G > 200 && B > 200;
}

export default isWhite;
