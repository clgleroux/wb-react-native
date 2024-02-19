import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Device from "expo-device";
import * as Location from "expo-location";

import OpenWeatherMapService from "./services/OpenWeatherMapService";

import LittleInfo from "./components/LittleInfo";
import TitleTxt from "./components/commun/TitleTxt";
import PreviewWeather from "./components/PreviewWeather";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [infoWeather, setInfoWeather] = useState(null);
  const [laterWeather, setLaterWeather] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const numberDays = 5;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let requestWeather = (
        await OpenWeatherMapService.getWeatherToday(
          location.coords.latitude,
          location.coords.longitude
        )
      ).data;

      requestWeather = {
        city: requestWeather.name,
        info: {
          temp: requestWeather.main.temp,
          feels_like: requestWeather.main.feels_like,
          temp_min: requestWeather.main.temp_min,
          temp_max: requestWeather.main.temp_max,
          pressure: requestWeather.main.pressure,
          humidity: requestWeather.main.humidity,
          main: requestWeather.weather[0]?.main,
          description: requestWeather.weather[0]?.description,
          icon: OpenWeatherMapService.getIconWeather(
            requestWeather.weather[0]?.icon
          ),
        },
        wind: {
          speed: requestWeather.wind.speed,
          deg: requestWeather.wind.deg,
        },
        clouds: {
          all: requestWeather.clouds.all,
        },
      };

      setInfoWeather(requestWeather);

      let requestLaterWeather = (
        await OpenWeatherMapService.getWeatherIn5Days(
          location.coords.latitude,
          location.coords.longitude,
          numberDays
        )
      ).data;

      setLaterWeather(requestLaterWeather.list);

      setIsLoading(false);
    })();
  }, []);

  let text = "Waiting..";
  let position;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    position = {
      lng: location.coords.longitude,
      lat: location.coords.latitude,
    };
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <Text style={styles.temp}>{infoWeather.info.temp}°C</Text>
              <Text style={styles.city}>{infoWeather.city}</Text>
            </View>

            <Image
              source={{ uri: infoWeather.info.icon }}
              style={{ width: 100, height: 100 }}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text>
              {infoWeather.info.temp_min}°C - {infoWeather.info.temp_max}°C
            </Text>
          </View>

          <TitleTxt value="Details"></TitleTxt>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              gap: 8,
            }}
          >
            <LittleInfo
              title="Pressure"
              value={infoWeather.info.pressure + "hPa"}
            ></LittleInfo>

            <LittleInfo
              title="Humidity"
              value={infoWeather.info.humidity + "%"}
            ></LittleInfo>

            <LittleInfo
              title="Feels Like"
              value={infoWeather.info.feels_like + "°C"}
            ></LittleInfo>
          </View>

          <TitleTxt value="In 5 Days"></TitleTxt>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{
              gap: 8,
              maxHeight: 180,
            }}
          >
            {laterWeather.map((item, index) => (
              <PreviewWeather weather={item} key={index}></PreviewWeather>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  temp: {
    fontSize: 25,
    fontWeight: 600,
  },
  city: {
    fontSize: 18,
    fontWeight: 300,
  },
});
