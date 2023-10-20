<script setup lang="ts">
import favorite from "@/assets/favorite.svg";
import star from "@/assets/star.svg";
import IconButton from "@/components/UI/icon-button.vue";
import type { DayWeather, TransformedWeekWeather } from "@/types/weather";

defineProps<{
  dayWeather: DayWeather | undefined;
  imageUrl: string;
  temperature: number;
  date: string;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  inFavorites: boolean;
  transformedWeekWeather: TransformedWeekWeather[] | undefined;
  toFavorites: (city: string) => void;
  alertFavorites(): void;
}>();
</script>

<template>
  <div class="container">
    <div v-if="dayWeather" class="card">
      <div class="temp_container">
        <div>
          <h3 class="city">{{ dayWeather.name }}</h3>
          <p>{{ date }}</p>
          <p class="temp">{{ temperature }} &deg; C</p>
        </div>
        <div class="action_container">
          <p>{{ dayWeather.sys.country }}</p>
          <IconButton v-if="inFavorites" @click="alertFavorites">
            <img class="star_svg" :src="star" alt="star" />
          </IconButton>
          <IconButton v-else @click="toFavorites(dayWeather.name)">
            <img :src="favorite" alt="fav" />
          </IconButton>
        </div>
      </div>
      <div class="weather_container">
        <div class="desc_container">
          <p>{{ dayWeather.weather[0].description }}</p>
          <img :src="imageUrl" alt="weather" />
        </div>
        <p>Feels like {{ feelsLike }} &deg; C</p>
      </div>
    </div>
    <div class="week_list">
      <div class="detailed">
        <p>
          <span>Humidity:</span>
          <span>{{ dayWeather?.main.humidity }} %</span>
        </p>
        <p>
          <span>Wind speed:</span>
          <span>{{ dayWeather?.wind.speed }} m/s</span>
        </p>
        <p>
          <span>Sunrise:</span><span>{{ sunrise }}</span>
        </p>
        <p>
          <span>Sunset:</span><span>{{ sunset }}</span>
        </p>
      </div>
      <div class="week_container">
        <div
          v-for="weather in transformedWeekWeather"
          :key="weather.date"
          class="week_card"
        >
          <div>{{ weather.date }}</div>
          <div>{{ weather.temperature }} &deg;</div>
          <img :src="weather.iconUrl" alt="weather" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 24px;
}
@media (max-width: 800px) {
  .container {
    flex-direction: column;
  }
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  aspect-ratio: 1/1;
  border-radius: 20px;
  color: white;
  background-image: url("https://images.unsplash.com/photo-1442213391790-7656f6e368b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80");
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  text-align: start;
  padding: 32px 32px 64px;
  font-size: xx-large;
  transition: all 0.5s ease;
}

@media (max-width: 800px) {
  .card {
    font-size: large;
  }
}

@media (min-width: 800px) {
  .card:hover {
    transform: scale(1.05);
  }
}

.week_list {
  flex: 1;
  background-color: #212730;
  border-radius: 20px;
}
.detailed {
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  margin-bottom: 40px;
  font-size: larger;
}
.detailed p {
  display: flex;
  justify-content: space-between;
}
.week_card {
  background-color: #253d5c;
  padding: 26px 4px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

@media (min-width: 800px) {
  .week_card:hover {
    transform: scale(1.1);
  }
}

.week_container {
  margin: 0 10px;
  padding: 16px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
@media (max-width: 456px) {
  .week_container {
    flex-direction: column;
  }
}
.action_container {
  text-align: center;
}
.temp {
  font-size: 68px;
}

.city {
  text-transform: uppercase;
}
.weather_container {
  border-radius: 15px;
  padding: 12px;
  width: fit-content;
  background-color: #ffffff50;
}
.desc_container {
  display: flex;
  align-items: center;
  gap: 12px;
}
.desc_container img {
  height: 70px;
}

.temp_container {
  display: flex;
  justify-content: space-between;
}
</style>
