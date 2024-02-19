import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";

import CardCocktails from "../components/CardCocktails";

import CocktailsService from "./../services/CocktailsService";

export default function FavoriteCocktailsScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cocktails, setCocktails] = useState(null);
  const [idsFavorite, setIdsFavorite] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      const temp = await CocktailsService.getFavorite();
      setIdsFavorite(temp);
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(idsFavorite);
      const cocktailsData = await Promise.all(
        idsFavorite.map(async (id) => {
          console.log(id);
          let requestCocktails = (await CocktailsService.getCocktailsByID(id))
            .data;
          return requestCocktails.drinks;
        })
      );

      setCocktails(cocktailsData.flat());
    };
    if (idsFavorite.length > 0) {
      fetchData();
    }
  }, [idsFavorite]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        renderItem={({ item }) => (
          <CardCocktails item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.idDrink}
      />
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