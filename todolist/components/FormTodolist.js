import React from "react";
import { Button, TextInput, View, StyleSheet, Pressable } from "react-native";

import PrimaryButton from "./commun/button/Primary";

export default function FormTodolist(props) {
  const [newTodolist, setNewTodolist] = React.useState("");

  const onPressAdd = () => {
    if (newTodolist.length === 0) {
      return false;
    }
    props.onChangeTodolists([...props.todolists, newTodolist]);
    setNewTodolist("");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 40,
        gap: 8,
        paddingHorizontal: 10,
      }}
    >
      <TextInput
        style={{ borderWidth: 1, flex: 4 }}
        placeholder="Add Todolist"
        value={newTodolist}
        onChangeText={(text) => setNewTodolist(text)}
      />
      <PrimaryButton
        onPress={() => onPressAdd()}
        title="Add"
        style={{ flex: 1 }}
        disabled={newTodolist.length === 0}
      />
    </View>
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
    backgroundColor: "blue",
  },
});
