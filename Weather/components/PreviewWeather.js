import React, { useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";

import OpenWeatherMapService from "./../services/OpenWeatherMapService";

export default function PreviewWeather(props) {
  const date = new Date(props.weather.dt * 1000);

  return (
    <View
      style={{
        flexDirection: "colum",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: 10,
      }}
    >
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 5,
          padding: 5,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View>
          <Image
            source={{
              uri: OpenWeatherMapService.getIconWeather(
                props.weather.weather[0].icon
              ),
            }}
            style={{ width: 100, height: 100 }}
          ></Image>
          <Text style={{ position: "absolute", bottom: 0, right: 0 }}>
            <Text style={styles.temp}>{props.weather.main.temp}</Text>°C
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8 }}>
          <Text style={styles.date}>{format(date, "dd-MM")}</Text>
          <Text style={styles.hour}>{format(date, "HH:mm")}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 18,
    fontWeight: 600,
  },
  hour: {
    fontSize: 16,
    fontWeight: 300,
  },
  temp: {
    fontSize: 24,
    fontWeight: 400,
  },
});
