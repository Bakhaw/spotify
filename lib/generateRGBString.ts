import { Color } from "colorthief";

function generateRGBString(color: Color): string {
  const [r, g, b] = color;
  const rgb = `rgb(${r},${g},${b})`;

  return rgb;
}

export default generateRGBString;
