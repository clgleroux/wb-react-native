import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Item,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

import CocktailsService from "./../services/CocktailsService";

export default function CardCocktails(props) {
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      const temp = await CocktailsService.getFavorite();

      const res = temp.filter((item) => item === props.item.idDrink);

      console.log(res);

      if (res.length > 0) setFavorite(true);
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
        onPress={() =>
          props.navigation.navigate("ViewCocktails", {
            idDrink: props.item.idDrink,
          })
        }
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View>
            <Image
              source={{
                uri: props.item.strDrinkThumb,
              }}
              style={{ width: 100, height: 100 }}
            ></Image>
            <Text style={styles.title}>{props.item.strDrink}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity onPress={fav} style={styles.buttonFavorite}>
              <Text>{isFavorite ? "❤️" : "🖤"}</Text>
            </TouchableOpacity>
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
