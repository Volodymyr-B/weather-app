<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import moment from "moment";
import { WeatherAction } from "@/actions/waether";
import IconButton from "@/components/UI/icon-button.vue";
import Spinner from "@/components/loading/spinner.vue";
import type { DayWeather } from "@/types/weather";
// ----------------------------------- property ----------------------------------//
const { city } = defineProps<{ city: string }>();
const emit = defineEmits<{ deleteFromFav: [string] }>();
// ----------------------------------- reactive ----------------------------------//

const dayWeather = ref<DayWeather>();
const fetchCounter = ref(0);

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
// ----------------------------------- actions ----------------------------------//

async function fetchWeather() {
  try {
    dayWeather.value = await WeatherAction.getForDay(city);
  } catch (err) {
    fetchCounter.value += 1;
  }
}
// ----------------------------------- watchers ----------------------------------//
watch(fetchCounter, () => setTimeout(fetchWeather, 2000));
// ----------------------------------- onMount ----------------------------------//
onMounted(fetchWeather);
</script>

<template>
  <div v-if="dayWeather" class="card">
    <div class="temp_container">
      <div>
        <div class="location">
          <h3 class="city">{{ dayWeather.name }}</h3>
          <p>{{ dayWeather.sys.country }}</p>
        </div>
        <p>{{ date }}</p>
        <p class="temp">{{ temperature }} &deg; C</p>
      </div>
      <div>
        <IconButton @click="emit('deleteFromFav', dayWeather.name)">
          <div>&times;</div>
        </IconButton>
      </div>
    </div>
    <div>
      <div class="desc_container">
        <p>{{ dayWeather.weather[0].description }}</p>
        <img :src="imageUrl" alt="weather" />
      </div>
      <p class="feels">feels like {{ feelsLike }} &deg; C</p>
    </div>
  </div>

  <Spinner v-else />
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 1/1;
  border-radius: 20px;
  color: white;
  background-image: url("https://images.unsplash.com/photo-1614348645153-44af7165b94c?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2080");
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  padding: 32px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    6px 6px 10px 0 rgba(248, 242, 242, 0.19);
  transition: all 0.5s ease;
}

.card:hover {
  transform: scale(1.02);
}
.temp {
  font-size: 68px;
}
@media (max-width: 800px) {
  .temp {
    font-size: 44px;
  }
}
@media (max-width: 476px) {
  .temp {
    font-size: 68px;
  }
}

.city {
  text-transform: uppercase;
}
.feels {
  font-size: x-large;
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
.location {
  display: flex;
  align-items: center;
  gap: 16px;
}
.location p {
  font-size: large;
}
</style>
