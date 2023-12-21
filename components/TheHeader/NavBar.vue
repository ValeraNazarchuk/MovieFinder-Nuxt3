<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  nav: {
    type: Array,
    required: true,
  },
});

const { nav } = toRefs(props);
</script>

<template>
  <nav class="nav">
    <ul class="nav__list">
      <li v-for="(item, index) in nav" :key="index" class="nav__list-item">
        <NuxtLink class="nav__item-link" :to="item.link">{{
          item.text
        }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  &__list {
    display: flex;
    align-items: center;
    gap: 30px;
    &-item {
      position: relative;
      letter-spacing: 0.3em;
      transition: all 0.6s;
      border-bottom: 1px solid transparent;
      color: $fs-gray;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 0;
        height: 3px;
        background-color: $bg-white;
        transition: width 0.5s;
      }
      &:hover::before {
        width: 100%;
      }
      &:hover {
        text-shadow: 0 0 5px gray, 0 0 25px gray, 0 0 50px gray, 0 0 100px gray;
        color: $fs-white;
      }
    }
  }
}
</style>
