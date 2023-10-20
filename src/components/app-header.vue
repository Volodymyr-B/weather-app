<script setup lang="ts">
import { RouterLink } from "vue-router";
import Logo from "@/components/logo.vue";
</script>

<template>
  <header class="header">
    <div class="logo"><Logo /></div>
    <div>
      <nav class="nav">
        <RouterLink class="link" active-class="active" to="/">Home</RouterLink>
        <RouterLink class="link" active-class="active" to="/favorites"
          >Favorites</RouterLink
        >
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  color: lightgray;
  padding: 16px 8px;
  display: flex;
  justify-content: space-between;
}
.logo {
  margin-left: 4px;
}
.nav {
  display: flex;
  gap: 8px;
}
.link {
  position: relative;
}
.active::before {
  content: "";
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background-color: #fff;
  position: absolute;
  bottom: -0.1rem;
  left: 0;
  opacity: 1;
}

.link:hover {
  color: white;
}
</style>
