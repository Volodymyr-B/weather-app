<script setup lang="ts">
import SearchButton from "@/components/UI/search-button.vue";

defineProps<{
  modelValue: string;
  searchCity: string;
  cities: {
    country: string;
    name: string;
    lat: string;
    lng: string;
  }[];
  getWeather: () => Promise<void>;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", modelValue: string): void;
}>();
</script>

<template>
  <div class="container">
    <h1>Weather App</h1>
    <div class="search_container">
      <input
        :value="modelValue"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @keyup.enter="getWeather"
        placeholder="Search..."
        type="text"
        list="_cities"
        class="input"
      />
      <datalist v-if="searchCity.length > 2" id="_cities">
        <option v-for="(city, i) in cities" :key="i">
          {{ city.name }}
        </option>
      </datalist>
      <div>
        <SearchButton @click="getWeather">Find</SearchButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  border-radius: 20px;
  background-color: #212730;
  padding: 32px;
}
.search_container {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
@media (max-width: 700px) {
  .wrapper {
    padding: 24px 16px;
  }
}
.input {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 45px;
  font-size: 18px;
  padding: 12px;
  border-radius: 12px;
  border: 1.5px solid lightgrey;
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0px 0px 20px -18px;
}

.input:hover {
  border: 2px solid lightgrey;
  box-shadow: 0px 0px 20px -17px;
}

.input:active {
  transform: scale(0.95);
}

.input:focus {
  border: 2px solid grey;
}
</style>
