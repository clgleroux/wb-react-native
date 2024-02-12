import React from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";

export default function PrimaryButton(props) {
  return (
    <Pressable
      onPress={() => props.onPress()}
      style={[
        styles.button,
        props.disabled ? styles.buttonDisabled : styles.buttonEnabled,
      ]}
      disabled={props.disabled}
    >
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
  },
  buttonEnabled: {
    backgroundColor: "blue",
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  text: {
    color: "#FFFFFF",
  },
});
