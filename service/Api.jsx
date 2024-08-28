import axios from "axios";
import config from "../config";

const apiKey = config.WEATHER_API_KEY;

export const weatherPlaceData = async (location) => {
  const data = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`
  );
  return data.data;
};

export const locationData = async (input) => {
  const data = await axios.get(
    `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${input}`
  );
  return data.data;
};
