<script setup lang="ts">
import { computed } from "vue";
const { error } = defineProps<{
  error: string;
}>();

const notFoundCity = computed(() => error.slice(error.length - 3) === "404");
</script>

<template>
  <section class="container">
    <h3>Something went wrong</h3>
    <p>{{ error }}</p>
    <p v-if="notFoundCity">
      We are very sorry but, it seems that the city you are looking for does not
      exist in our database. Try another city
    </p>
    <p v-else>Please try again later</p>
  </section>
</template>

<style scoped>
.container {
  padding: 28px 8px;
  border-radius: 20px;
  background-color: #212730;
}
</style>
