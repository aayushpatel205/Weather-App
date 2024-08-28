import React from "react";
import { Image } from "react-native";
const weatherImages = {
  Cloudy: require("../assets/images/Cloudy.png"),
  "Heavy Rain": require("../assets/images/HeavyRain.png"),
  "Heavy rain": require("../assets/images/HeavyRain.png"),
  "Moderate Rain": require("../assets/images/ModerateRain.png"),
  "Moderate rain": require("../assets/images/ModerateRain.png"),
  "Patchy rain nearby": require("../assets/images/ModerateRain.png"),
  "Patchy light rain with thunder": require("../assets/images/ModerateRain.png"),
  "Moderate or heavy rain with thunder": require("../assets/images/HeavyRain.png"),
  "Moderate or heavy rain shower": require("../assets/images/HeavyRain.png"),
  "Light Rain": require("../assets/images/ModerateRain.png"),
  "Light rain": require("../assets/images/ModerateRain.png"),
  Mist: require("../assets/images/Mist.png"),
  "Partly Cloudy": require("../assets/images/PartlyCloudy.png"),
  "Partly cloudy": require("../assets/images/PartlyCloudy.png"),
  Sunny: require("../assets/images/Sunny.png"),
  Clear: require("../assets/images/Sunny.png"),
};

const WeatherImage = ({ weatherData, forecast }) => {
  const weatherCondition = forecast
    ? weatherData?.day.condition.text.trimEnd()
    : weatherData?.current.condition.text;
  const weatherImage =
    weatherImages[weatherCondition] ||
    require("../assets/images/defaultImage.png");

  return (
    <Image
      source={weatherImage}
      style={{
        height: forecast ? 50 : 170,
        width: forecast ? 50 : 170,
      }}
    />
  );
};

export default WeatherImage;
