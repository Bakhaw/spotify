import fullVinylColors from "./fullVinylColors";

const vinylColors = [
  {
    albumId: "",
    backgroundColor: "",
  },
  ...(fullVinylColors && [...fullVinylColors]),
];

export default vinylColors;
