import axios from "axios";
const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;
import type { DayWeather, WeekWeather } from "@/types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const WeatherAction = {
  async getForDay(city: string): Promise<DayWeather> {
    const res = await axios.get(
      `${BASE_URL}/weather?units=metric&q=${city}&appid=${WEATHER_KEY}`
    );
    return res.data;
  },
  async getForWeek(city: string): Promise<WeekWeather> {
    const res = await axios.get(
      `${BASE_URL}/forecast?units=metric&q=${city}&appid=${WEATHER_KEY}`
    );
    return res.data;
  },
};
