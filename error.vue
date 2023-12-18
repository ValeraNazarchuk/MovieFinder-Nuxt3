<template>
  <div class="error"></div>
</template>

<script setup>
import { navigateTo, useError } from "nuxt/app";
const error = useError();

if (error.value.statusCode === 404) {
  navigateTo({ path: "/404" });
}
</script>
