<script setup lang="ts"></script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: #f2f2f2;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  border: gray;
  transition: 0.5s;
}

button:hover {
  transform: scale(1.1);
}
.button:disabled {
  cursor: default;
  background-color: lightgray;
}

button:active {
  background-color: lightgray;
}
</style>
