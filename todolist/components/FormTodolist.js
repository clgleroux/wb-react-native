import React from "react";
import { Button, TextInput, View } from "react-native";

export default function FormTodolist(props) {
  const [newTodolist, setNewTodolist] = React.useState("");

  const onPressAdd = () => {
    props.onChangeTodolists([...props.todolists, newTodolist]);
    setNewTodolist("");
  };

  return (
    <View style={{ flexDirection: "row", height: 35, gap: 8 }}>
      <TextInput
        style={{ borderWidth: 1 }}
        placeholder="Add Todolist"
        value={newTodolist}
        onChangeText={(text) => setNewTodolist(text)}
      />
      <Button onPress={() => onPressAdd()} title="Add" />
    </View>
  );
}
