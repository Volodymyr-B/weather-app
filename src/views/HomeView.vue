<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { AxiosError } from "axios";
import moment from "moment";
import cities from "cities.json";
import { useToast } from "vue-toastification";
import { WeatherAction } from "@/actions/waether";
import { LocationAction } from "@/actions/location";
import Search from "@/components/search.vue";
import Detailed from "@/components/detailed.vue";
import Spinner from "@/components/loading/spinner.vue";
import Error from "@/components/error.vue";
import type {
  DayWeather,
  WeekWeather,
  TransformedWeekWeather,
  TemporaryWeather,
} from "@/types/weather";

const toast = useToast();
// ----------------------------------- reactive ----------------------------------//
const searchCity = ref("");
const dayWeather = ref<DayWeather>();
const weekWeather = ref<WeekWeather>();
const transformedWeekWeather = ref<TransformedWeekWeather[]>();
const favoritesList = ref<string[]>([]);
const loading = ref(true);
const error = ref("");

// ----------------------------------- computed ----------------------------------//
const imageUrl = computed(
  () =>
    `https://api.openweathermap.org/img/w/${dayWeather.value?.weather[0].icon}.png`
);
const temperature = computed(() =>
  Math.round(dayWeather.value?.main.temp || 0)
);
const feelsLike = computed(() =>
  Math.round(dayWeather.value?.main.feels_like || 0)
);
const date = computed(() => moment().format("MMMM DD"));
const sunrise = computed(() =>
  moment(dayWeather.value?.sys.sunrise).format("hh : mm : ss")
);
const sunset = computed(() =>
  moment(dayWeather.value?.sys.sunset).format("H : mm : ss")
);
const inFavorites = computed(() =>
  favoritesList.value.some((city) => city === dayWeather.value?.name)
);
const shortCitiesList = computed(() =>
  cities
    .filter((city) =>
      city.name.toLocaleLowerCase().includes(searchCity.value.toLowerCase())
    )
    .slice(0, 6)
);
// ----------------------------------- actions ----------------------------------//
function transformData() {
  const converterData = weekWeather.value?.list
    .map((weather) => ({
      date: moment(weather.dt_txt).format("MMMM DD"),
      temperature: [Math.round(weather.main.temp)],
      desc: weather.weather[0].description,
      iconUrl: `https://api.openweathermap.org/img/w/${weather.weather[0].icon}.png`,
    }))
    .reduce((acc: TemporaryWeather[], item) => {
      if (!acc.some((day) => day.date === item.date)) {
        acc.push(item);
      } else {
        acc.map((it) =>
          it.date === item.date ? it.temperature.push(...item.temperature) : it
        );
      }
      return acc;
    }, [])
    .map((weather) => ({
      ...weather,
      temperature: Math.round(
        weather.temperature.reduce((acc, t) => acc + t, 0) /
          weather.temperature.length
      ),
    }));

  transformedWeekWeather.value = converterData?.slice(1, converterData.length);
}

async function getWeather() {
  if (searchCity.value.length < 3) return toast.error("short entry") as any;
  if (
    searchCity.value.toLocaleLowerCase() ===
    dayWeather.value?.name.toLocaleLowerCase()
  )
    return;
  loading.value = true;
  error.value = "";
  try {
    dayWeather.value = await WeatherAction.getForDay(searchCity.value);
    weekWeather.value = await WeatherAction.getForWeek(searchCity.value);
  } catch (err) {
    error.value = (err as AxiosError).message;
  }
  searchCity.value = "";
  loading.value = false;
}

function toFavorites(city: string) {
  const currentlyInStorage: string[] = JSON.parse(
    localStorage.getItem("cityList") || "[]"
  );
  if (currentlyInStorage.some((cityName) => cityName === city))
    return toast.error(`${city} already in favorites`);
  if (currentlyInStorage.length === 6)
    return toast.error("only 6 cities can be in favorites");
  localStorage.setItem(
    "cityList",
    JSON.stringify([...currentlyInStorage, city])
  );
  favoritesList.value = [...currentlyInStorage, city];
}

function alertFavorites() {
  toast.error("Already in favorites");
}
// ----------------------------------- watchers ----------------------------------//
watch(weekWeather, transformData);
// ----------------------------------- onMount ----------------------------------//

onMounted(async () => {
  favoritesList.value = JSON.parse(localStorage.getItem("cityList") || "[]");
  let currLoc = "San francisco";
  try {
    const res = await LocationAction.getLoc();
    currLoc = res.city;
  } catch (e) {}
  try {
    dayWeather.value = await WeatherAction.getForDay(currLoc);
    weekWeather.value = await WeatherAction.getForWeek(currLoc);
  } catch (err) {
    error.value = (err as AxiosError).message;
  }
  loading.value = false;
});
</script>

<template>
  <div class="wrapper">
    <Search
      :cities="shortCitiesList"
      :search-city="searchCity"
      :get-weather="getWeather"
      v-model="searchCity"
    />
    <Spinner v-if="loading" />
    <Error v-else-if="!loading && error" :error="error" />
    <Detailed
      v-else
      :date="date"
      :day-weather="dayWeather"
      :feels-like="feelsLike"
      :image-url="imageUrl"
      :in-favorites="inFavorites"
      :sunrise="sunrise"
      :sunset="sunset"
      :temperature="temperature"
      :to-favorites="toFavorites"
      :alert-favorites="alertFavorites"
      :transformed-week-weather="transformedWeekWeather"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px;
  border-radius: 20px;
  color: white;
  text-align: center;
}
</style>
