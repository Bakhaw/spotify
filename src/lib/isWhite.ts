import { Color } from "colorthief";

function isWhite(color: Color): boolean {
  const [r, g, b] = color;
  const colorLimit = 180; // 0 is black 250 is white
  const result = r > colorLimit && g > colorLimit && b > colorLimit; // when we approach 180 we are close to a white color

  return result;
}

export default isWhite;
