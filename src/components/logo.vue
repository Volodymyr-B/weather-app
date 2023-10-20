<script setup lang="ts"></script>

<template>
  <div class="logo"></div>
</template>

<style scoped>
.logo {
  width: 28px;
  height: 28px;
  background: #ff6b6b;
  display: block;
  margin: 0px auto;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

.logo::before {
  content: "";
  box-sizing: border-box;
  left: 0;
  top: 0;
  transform: rotate(45deg);
  position: absolute;
  width: 28px;
  height: 28px;
  background: #ff3d3d;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}

.logo::after {
  content: "";
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  background: rgb(255, 107, 107);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
