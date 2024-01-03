<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const { movie } = toRefs(props);
</script>

<template>
  <img
    v-if="movie.Poster !== 'N/A'"
    class="carousel__poster"
    :src="movie.Poster"
    alt="Poster"
  />
  <el-empty v-else :image-size="200" description="No photo" />
  <div class="carousel__content">
    <h4 class="carousel__title">
      {{ movie.Title }}
    </h4>
    <p class="carousel__text">
      {{ movie.Year }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  font-size: 20px;
  line-height: 26px;
  &__item {
    display: flex;
    flex-direction: column;
    color: $fs-white;
    border: 1px solid $border-white;
    background-color: $bg-gray;
    border-radius: 20px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    height: 100%;
  }
  &__title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 10px;
  }
  &__poster {
    width: 100%;
    height: 70%;
    border-radius: 20px 20px 0 0;
  }
  &__btn {
    margin: 0 auto;
  }
}
</style>
