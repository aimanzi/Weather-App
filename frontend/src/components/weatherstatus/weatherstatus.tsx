import {
  BrightnessHighFill,
  CloudFill,
  CloudLightningRainFill,
} from "react-bootstrap-icons";

class WeatherStatus {
  static clear = (<BrightnessHighFill />);
  static cloudy = (<CloudFill />);
  static rain = (<CloudLightningRainFill />);
}

export default WeatherStatus;
