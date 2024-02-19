import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Item,
  ActivityIndicator,
  Image,
  Button,
} from "react-native";

import CardCocktails from "../components/CardCocktails";

import CocktailsService from "../services/CocktailsService";

export default function ViewCocktailsScreen({ route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cocktails, setCocktails] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      let requestCocktails = (
        await CocktailsService.getCocktailsByID(route.params.idDrink)
      ).data;

      console.log(requestCocktails);

      setCocktails(requestCocktails.drinks[0]);

      setIsLoading(false);
    })();
  }, []);

  const addFavorite = () => {
    console.log(route.params.idDrink);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Image
            source={{
              uri: cocktails.strDrinkThumb,
            }}
            style={{ width: 100, height: 100 }}
          ></Image>
          <Text>{cocktails.idDrink}</Text>
          <Text>{cocktails.strDrink}</Text>
          <Text>{cocktails.strInstructions}</Text>

          <Button onPress={addFavorite}>Add Favorite</Button>
        </View>
      )}
    </View>
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
