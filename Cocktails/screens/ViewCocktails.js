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
  TouchableOpacity,
} from "react-native";

import CocktailsService from "../services/CocktailsService";

import { Dimensions } from "react-native";

export default function ViewCocktailsScreen({ route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cocktails, setCocktails] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      let requestCocktails = (
        await CocktailsService.getCocktailsByID(route.params.idDrink)
      ).data;

      setCocktails(requestCocktails.drinks[0]);

      let ingredientsList = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = requestCocktails.drinks[0][`strIngredient${i}`];
        const measure = requestCocktails.drinks[0][`strMeasure${i}`];
        if (ingredient != null) {
          ingredientsList.push({ ingredient, measure });
        }
      }
      setIngredients(ingredientsList);

      setIsFavorite(
        await CocktailsService.isFavoriteById(route.params.idDrink)
      );

      setIsLoading(false);
    })();
  }, []);

  const addFavorite = async () => {
    if (isFavorite) {
      await CocktailsService.removeFavorite(cocktails.idDrink);
    } else {
      await CocktailsService.setFavorite(cocktails.idDrink);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: cocktails.strDrinkThumb,
              }}
              style={{ width: 100, height: 100 }}
            ></Image>
            <TouchableOpacity onPress={addFavorite}>
              <Text>{isFavorite ? "Remove Favorite" : "Add Favorite"}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>{cocktails.strDrink}</Text>

          <Text>Glass: {cocktails.strGlass}</Text>

          <Text style={styles.subtitle}>Ingredients</Text>
          {ingredients.map((item, index) => (
            <Text key={index}>
              {item.ingredient} : {item.measure}
            </Text>
          ))}

          <Text style={styles.subtitle}>Instructions</Text>
          <Text>{cocktails.strInstructions}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
});
