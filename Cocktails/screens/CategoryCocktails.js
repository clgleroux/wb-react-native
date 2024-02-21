import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  ActivityIndicator,
} from "react-native";

import CardCocktails from "../components/CardCocktails";

import CocktailsService from "../services/CocktailsService";

import { Dimensions } from "react-native";

export default function CategoryCocktailsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cocktails, setCocktails] = useState(null);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [indexAlphabet, setIndexAlphabet] = useState(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      let requestCocktailsCategoryOrdinary = (
        await CocktailsService.getCocktailsByCategory("Ordinary_Drink")
      ).data;

      let requestCocktailsCategoryCocktails = (
        await CocktailsService.getCocktailsByCategory("Cocktail")
      ).data;

      setCocktails([
        {
          title: "Ordinary Drink",
          data: requestCocktailsCategoryOrdinary.drinks,
        },
        {
          title: "Cocktails",
          data: requestCocktailsCategoryCocktails.drinks,
        },
      ]);

      setIsLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          sections={cocktails}
          keyExtractor={(item, index) => item + index}
          contentContainerStyle={{ gap: 20 }}
          renderItem={({ item }) => (
            <View>
              <CardCocktails item={item} navigation={navigation} />
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
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
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 23,
    fontWeight: 600,
  },
});
