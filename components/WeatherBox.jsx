import React from "react";
import { View, Text } from "react-native";
import { styles } from "../style";
import WeatherImage from "./WeatherImage";

function getDayFromDate(dateString) {
  const date = new Date(dateString);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

const WeatherBox = ({ data }) => {
  const dayOfWeek = getDayFromDate(data?.date);
  return (
    <View style={styles.weatherBox}>
      <View style={{ display: "flex", alignItems: "center" }}>
        <WeatherImage weatherData={data} forecast />
        <Text
          style={{
            fontSize: 17,
            color: "#fff",
            opacity: 0.7,
            flexWrap: "wrap",
          }}
        >
          {dayOfWeek}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          color: "#fff",
          textAlign: "center",
        }}
      >
        {data?.day.avgtemp_c}°C
      </Text>
    </View>
  );
};

export default WeatherBox;
