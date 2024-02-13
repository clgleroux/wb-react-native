import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TitleTxt(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: 500,
  },
});
