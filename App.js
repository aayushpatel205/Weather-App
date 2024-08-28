import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import WeatherBox from "./components/WeatherBox";
import { styles } from "./style";
import { weatherPlaceData, locationData } from "./service/Api";
import SearchMenu from "./components/SearchMenu";
import WeatherImage from "./components/WeatherImage";
import AnimatedLoader from "react-native-animated-loader";
import { debounce } from "lodash";

function convertTo12HourFormat(dateString) {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${formattedMinutes} ${ampm}`;
}

const App = () => {
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState();
  const [textInput, setTextInput] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [locationName, setLocationName] = useState("london");

  const setLocationData = debounce(async () => {
    const data = await locationData(textInput);
    setLocations(data);
  }, 300);

  useEffect(() => {
    const weatherDataFunc = async () => {
      try {
        const data2 = await weatherPlaceData(locationName);
        setWeatherData(data2);
      } catch (error) {
        console.error("There was an error fetching data: ", error);
      }
    };
    weatherDataFunc();
  }, [locationName]);

  useEffect(() => {
    if (textInput) {
      setLocationData();
    }
  }, [textInput]);

  useEffect(() => {
    if (!open) {
      setTextInput("");
    }
  }, [open]);

  return weatherData ? (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar backgroundColor={"#083139"} />
      <ImageBackground
        source={require("./assets/images/bg.png")}
        blurRadius={70}
        style={styles.imgBackground}
      >
        <View open={open} style={styles.searchBox}>
          <TextInput
            value={textInput}
            placeholder="search a city..."
            placeholderTextColor={"#bdbdbd"}
            style={open ? styles.searchBar : styles.searchBarClose}
            onChangeText={(text) => {
              setTextInput(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
              if (locations) {
                setLocationName(locations[0]?.name);
              }
            }}
            style={
              open ? styles.searchBtn : [styles.searchBtn, styles.searchBtnOnly]
            }
          >
            <Icon name="search" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={{
            display:
              textInput?.length < 3 || locations?.length <= 0 || !open
                ? "none"
                : "flex",
            maxHeight: 190,
            width: "90%",
            zIndex: 100,
            borderRadius: 15,
            padding: 5,
            position: "absolute",
            top: 80,
            left: 25,
            backgroundColor: "#e2e8f0",
            backfaceVisibility: "hidden",
          }}
        >
          {locations ? (
            locations?.map((element, index) => {
              return (
                <SearchMenu
                  data={element}
                  key={index}
                  setLocationName={setLocationName}
                  setTextInput={setTextInput}
                />
              );
            })
          ) : (
            <></>
          )}
        </ScrollView>

        <View
          style={{
            display: "flex",
            gap: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={styles.nameHeadingView}>
            <Text style={styles.heading}>{weatherData?.location.name},</Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 25,
                fontWeight: "400",
                opacity: 0.7,
                textAlign: "center",
              }}
            >
              {weatherData?.location.country}
            </Text>
          </View>

          <WeatherImage weatherData={weatherData} forecast={false} />

          <View style={{ display: "flex", alignItems: "center" }}>
            <Text style={{ fontSize: 60, fontWeight: "700", color: "#fff" }}>
              {weatherData.current.temp_c ? weatherData.current.temp_c : "- -"}°C
            </Text>
            <Text style={{ color: "#FFF", fontSize: 23, opacity: 0.7 }}>
              {weatherData?.current.condition.text}
            </Text>
          </View>

          <View
            style={{
              padding: 15,
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                gap: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("./assets/icons/wind.png")}
                style={{ opacity: 0.7, height: 35, width: 35 }}
              />
              <Text style={{ fontSize: 20, opacity: 0.7, color: "#fff" }}>
                {weatherData?.current.wind_kph + " Km/h"}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                gap: 3,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("./assets/icons/drop.png")}
                style={{ opacity: 0.7, height: 35, width: 35 }}
              />
              <Text style={{ fontSize: 20, opacity: 0.7, color: "#fff" }}>
                {weatherData?.current.humidity + "%"}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                gap: 7,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("./assets/icons/sun.png")}
                style={{ opacity: 0.7, height: 35, width: 35 }}
              />
              <Text style={{ fontSize: 20, opacity: 0.7, color: "#fff" }}>
                {convertTo12HourFormat(weatherData?.location.localtime)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            paddingLeft: 25,
            paddingTop: 10,
            gap: 25,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Icon
              name="calendar"
              size={30}
              color="#fff"
              style={{ opacity: 0.7 }}
            />
            <Text style={{ fontSize: 20, color: "#fff", opacity: 0.7 }}>
              Daily Forecast
            </Text>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            scrollEventThrottle={16}
          >
            {weatherData?.forecast.forecastday.map((element, index) => {
              return <WeatherBox data={element} key={index} />;
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  ) : (
    <View>
      <StatusBar backgroundColor={"#083139"} />
      <AnimatedLoader
        overlayColor="#083139"
        animationStyle={styles.lottie}
        speed={1}
        visible
      ></AnimatedLoader>
    </View>
  );
};
export default App;
