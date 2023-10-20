<script setup lang="ts">
import { ref, onMounted } from "vue";
import FavoriteCard from "@/components/favorite-card.vue";

// ----------------------------------- reactive ----------------------------------//
const favoritesList = ref<string[]>([]);
// ----------------------------------- actions ----------------------------------//
function deleteFromFav(cityName: string) {
  localStorage.setItem(
    "cityList",
    JSON.stringify(favoritesList.value.filter((city) => city !== cityName))
  );
  favoritesList.value = JSON.parse(localStorage.getItem("cityList") || "[]");
}
// ----------------------------------- onMount ----------------------------------//

onMounted(() => {
  favoritesList.value = JSON.parse(localStorage.getItem("cityList") || "[]");
});
</script>
<template>
  <div v-if="favoritesList.length" class="container">
    <FavoriteCard
      @delete-from-fav="deleteFromFav"
      v-for="favCity in favoritesList"
      :key="favCity"
      :city="favCity"
    />
  </div>
  <h3 class="empty" v-else>
    There's nothing here yet. Add a city from the main page
  </h3>
</template>

<style scoped>
.container {
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
@media (max-width: 970px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}
.empty {
  color: white;
  text-align: center;
  padding-top: 48px;
}
</style>
