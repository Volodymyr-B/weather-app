<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "@/components/app-header.vue";
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
