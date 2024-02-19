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

export default function ListCocktailsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cocktails, setCocktails] = useState(null);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [indexAlphabet, setIndexAlphabet] = useState(0);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    (async () => {
      let requestCocktails = (
        await CocktailsService.getCocktailsByFirstLetter(
          alphabet[indexAlphabet]
        )
      ).data;

      if (cocktails) {
        setCocktails([...cocktails, ...requestCocktails.drinks]);
      } else {
        setCocktails(requestCocktails.drinks);
      }

      setIsLoading(false);
    })();
  }, [indexAlphabet]);

  const fetchNextPage = async () => {
    setIndexAlphabet(indexAlphabet + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        contentContainerStyle={{ gap: 20 }}
        onEndReached={fetchNextPage}
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
