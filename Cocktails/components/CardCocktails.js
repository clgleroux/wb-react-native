import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import CocktailsService from "./../services/CocktailsService";

export default function CardCocktails(props) {
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      const temp = await CocktailsService.getFavorite();

      if (temp && temp.length > 0) {
        const res = temp.filter((item) => item === props.item.idDrink);

        if (res.length > 0) setFavorite(true);
      }
    };
    fetchFavorites();
  }, []);

  const fav = async () => {
    if (isFavorite) {
      await CocktailsService.removeFavorite(props.item.idDrink);
    } else {
      await CocktailsService.setFavorite(props.item.idDrink);
    }

    setFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("ViewCocktails", {
            idDrink: props.item.idDrink,
          });
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Image
              source={{
                uri: props.item.strDrinkThumb,
              }}
              style={{ width: 100, height: 100 }}
            ></Image>
            <TouchableOpacity onPress={fav} style={styles.buttonFavorite}>
              <Text>{isFavorite ? "❤️" : "🖤"}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "start" }}>
            <Text style={styles.title}>{props.item.strDrink}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
  title: {
    fontSize: 20,
  },
  buttonFavorite: {
    width: 20,
    height: 20,
  },
});
