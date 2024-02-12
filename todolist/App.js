import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

import FormTodolist from "./components/FormTodolist";
import ElmentTodolist from "./components/ElmentTodolist";

export default function App() {
  const [todolists, onChangeTodolists] = React.useState([]);

  const onDelete = (index) => {
    let temp = [...todolists];
    temp.splice(index, 1);
    onChangeTodolists(temp);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Todolist</Text>

      <ScrollView>
        <View style={{ gap: 10 }}>
          {todolists.map((todolist, index) => (
            <ElmentTodolist
              key={index}
              todolist={todolist}
              onDelete={() => onDelete(index)}
            ></ElmentTodolist>
          ))}
        </View>
      </ScrollView>

      <FormTodolist
        todolists={todolists}
        onChangeTodolists={onChangeTodolists}
      ></FormTodolist>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
