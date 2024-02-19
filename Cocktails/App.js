import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Item } from "react-native";

import ListCocktailsScreen from "./screens/ListCocktails";
import ViewCocktailsScreen from "./screens/ViewCocktails";
import FavoriteCocktailsScreen from "./screens/FavoriteCocktails";
import CategoryCocktailsScreen from "./screens/CategoryCocktails";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import { Ionicons } from "@expo/vector-icons";

function CocktailsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ListCocktails"
    >
      <Stack.Screen name="ListCocktails" component={ListCocktailsScreen} />
      <Stack.Screen name="ViewCocktails" component={ViewCocktailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Cocktails"
          component={CocktailsStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="FavoriteCocktails"
          component={FavoriteCocktailsScreen}
          options={{
            unmountOnBlur: true,
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="CategoryCocktails"
          component={CategoryCocktailsScreen}
          options={{
            tabBarLabel: "Category",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cube" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
