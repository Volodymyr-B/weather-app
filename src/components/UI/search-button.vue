<script setup lang="ts"></script>

<template>
  <button class="button" props>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
.button {
  cursor: pointer;
  padding: 0 12px;
  position: relative;
  font-family: inherit;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.05em;
  border-radius: 0.8em;
  border: none;
  background: linear-gradient(to right, #8e2de2, #4a00e0);
  color: ghostwhite;
  overflow: hidden;
  user-select: none;
}
.button span {
  position: relative;
  z-index: 10;
  transition: color 0.4s;
  display: inline-flex;
  align-items: center;
  padding: 0.8em 1.2em 0.8em 1.05em;
}

.button::before,
.button::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.button::before {
  content: "";
  background: #000;
  width: 120%;
  left: -10%;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

.button:hover::before {
  transform: translate3d(100%, 0, 0);
}

.button:active {
  transform: scale(0.95);
}
</style>
