<script setup></script>

<template>
  <span class="loader"></span>
</template>

<style lang="scss" scoped>
.loader {
  width: 68px;
  height: 68px;
  border: 5px solid $border-blue;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
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
