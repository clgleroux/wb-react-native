import React from "react";
import { Button, View, Text } from "react-native";

export default function FormTodolist(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Text>{props.todolist}</Text>

      <Button title="Delete" onPress={() => props.onDelete()} />
    </View>
  );
}
