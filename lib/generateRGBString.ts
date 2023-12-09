import { Color } from "colorthief";

function generateRGBString(color: Color, opacity?: number): string {
  const [r, g, b] = color;
  const rgb = `rgb(${r},${g},${b})`;
  const rgba = `rgba(${r},${g},${b},${opacity})`;

  return opacity ? rgba : rgb;
}

export default generateRGBString;
