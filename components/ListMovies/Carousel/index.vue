<script setup>
import { defineProps, toRefs } from "vue";

const emits = defineEmits(["onWatch", "updateIndex"]);

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

const { movies } = toRefs(props);

const handleCarouselChange = (carouselIndex) => {
  emits("updateIndex", carouselIndex);
};

const watchMovieClick = (movieId) => {
  emits("onWatch", movieId);
};
</script>

<template>
  <el-carousel
    class="carousel"
    arrow="always"
    height="500px"
    :interval="5000"
    type="card"
    @change="handleCarouselChange"
  >
    <el-carousel-item
      v-for="movie in movies"
      :key="movie"
      class="carousel__item"
    >
      <list-movies-carousel-content :movie="movie" />
      <BaseButton
        native-type="button"
        type="primary"
        @onClick="watchMovieClick(movie)"
      >
        Watch
      </BaseButton>
    </el-carousel-item>
  </el-carousel>
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
}

.el-button--primary {
  font-size: 18px;
  padding: 20px 0;
  border-radius: 0px 0px 20px 20px;
}
</style>
