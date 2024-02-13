import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

export default function LittleInfo(props) {
  return (
    <View
      style={{
        flexDirection: "colum",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Image></Image>
      <Text style={styles.value}>{props.value}</Text>
      <Text>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  value: {
    fontSize: 18,
    fontWeight: 600,
  },
});
