import React from "react";
import { Button, View, Text } from "react-native";

import DeleteButton from "./commun/button/Delete";

export default function FormTodolist(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
      }}
    >
      <Text style={{ width: "70%" }}>{props.todolist}</Text>

      <DeleteButton title="Delete" onPress={() => props.onDelete()} />
    </View>
  );
}
