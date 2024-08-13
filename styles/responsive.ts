import { Dimensions, PixelRatio } from "react-native";

const designWidth = 393;
const designHeight = 852;

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const heightScale = (size: number) => SCREEN_HEIGHT / designHeight * size;

const widthScale = (size: number) => SCREEN_WIDTH / designWidth * size;

const scale = SCREEN_WIDTH / designWidth;

const fontSize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export { heightScale, widthScale, fontSize };