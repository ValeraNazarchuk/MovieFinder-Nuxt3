<script setup>
import { ref } from "vue";

const nav = ref([
  { text: "Home", link: "/" },
  { text: "Form", link: "/form" },
  { text: "Favorite", link: "/favorite-movies" },
]);
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <NuxtLink class="header__logo" to="/">MovieFinder</NuxtLink>
        <TheHeaderNavBar :nav="nav" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  color: $fs-white;
  background: $bg-black;
  padding: 25px 0px;
  &__logo {
    font-size: 20px;
    line-height: auto;
  }
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__search-box {
    display: flex;
    align-items: center;
    &-input {
      max-width: 250px;
      width: 100%;
    }
  }
}
</style>
