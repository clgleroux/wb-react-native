import axios from "axios";
import { API_KEY_OPENWEATHERMAP } from "@env";

class OpenWeatherMapService {
  apiKey = API_KEY_OPENWEATHERMAP;
  url = "https://api.openweathermap.org";

  getWeatherToday = async (lat, lng) => {
    return await axios.get(`${this.url}/data/2.5/weather`, {
      params: {
        lat: lat,
        lon: lng,
        appid: this.apiKey,
        units: "metric",
      },
    });
  };

  getIconWeather = (id) => {
    return `https://openweathermap.org/img/wn/${id}@2x.png`;
  };

  getWeatherIn5Days = async (lat, lng) => {
    return await axios.get(`${this.url}/data/2.5/forecast`, {
      params: {
        lat: lat,
        lon: lng,
        units: "metric",
        appid: this.apiKey,
      },
    });
  };
}

const singleton = new OpenWeatherMapService();
export default singleton;
