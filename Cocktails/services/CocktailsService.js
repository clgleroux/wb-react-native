import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class CocktailsService {
  url = "https://thecocktaildb.com/api";

  getCocktailsByFirstLetter = async (letter) => {
    return await axios.get(`${this.url}/json/v1/1/search.php`, {
      params: {
        f: letter,
      },
    });
  };

  getCocktailsByCategory = async (category) => {
    return await axios.get(`${this.url}/json/v1/1/filter.php`, {
      params: {
        c: category,
      },
    });
  };

  getCocktailsByID = async (id) => {
    return await axios.get(`${this.url}/json/v1/1/lookup.php`, {
      params: {
        i: id,
      },
    });
  };

  setFavorite = async (id) => {
    try {
      let myArray = await AsyncStorage.getItem("favorites");
      if (myArray !== null) {
        myArray = JSON.parse(myArray);
        myArray.push(id);
        myArray = [...new Set(myArray)];
      } else {
        myArray = [id];
      }

      return await AsyncStorage.setItem("favorites", JSON.stringify(myArray));
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  getFavorite = async () => {
    return JSON.parse(await AsyncStorage.getItem("favorites"));
  };

  isFavoriteById = async (id) => {
    let favorites = JSON.parse(await AsyncStorage.getItem("favorites"));

    return favorites.filter((item) => item === id).length ? true : false;
  };

  removeFavorite = async (id) => {
    try {
      let myArray = await AsyncStorage.getItem("favorites");
      if (myArray !== null) {
        myArray = JSON.parse(myArray);
        myArray = myArray.filter((item) => item !== id);
      } else {
        myArray = [];
      }

      return await AsyncStorage.setItem("favorites", JSON.stringify(myArray));
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
}

const singleton = new CocktailsService();
export default singleton;
