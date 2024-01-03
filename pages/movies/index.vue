<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMoviesStore } from "@/stores/movies";

import { useHead } from "#app";

useHead({
  title: "Movies",
});

const router = useRouter();
const route = useRoute();
const moviesStore = useMoviesStore();
const pageNumber = ref(+route.query.page);

let setTimer;

const startPageSwitchTimer = (index) => {
  setTimer = setTimeout(() => {
    if (index > 8) {
      pageNumber.value++;
    } else {
      pageNumber.value--;
    }
    router.push(
      `/movies?search=${route.query.search}&page=${pageNumber.value}`
    );

    moviesStore.getListMovies(route.query.search, pageNumber.value);
  }, 3000);
};

const handleIndexUpdate = (index) => {
  if (index > 8) {
    clearTimeout(setTimer);
    startPageSwitchTimer(index);
  } else if (pageNumber.value > 1 && index === 0) {
    clearTimeout(setTimer);
    startPageSwitchTimer();
  } else {
    clearTimeout(setTimer);
  }
};

const watchMovie = (movie) => {
  clearTimeout(setTimer);
  router.push(`/movies/${movie.imdbID}`);
};

moviesStore.getListMovies(route.query.search, route.query.page);
// onMounted(async () => {
//   await moviesStore.getListMovies(route.query.search, route.query.page);
// });
</script>

<template>
  <div class="movies">
    <h2 v-if="moviesStore.loading" class="loader-container">
      <BaseLoader />
    </h2>
    <div v-else>
      <h2 v-if="!moviesStore.movies" class="movies__error">No movies found</h2>
      <div v-else>
        <h2 class="movies__title">Movies</h2>
        <list-movies-carousel
          :movies="moviesStore.movies"
          @updateIndex="handleIndexUpdate"
          @onWatch="watchMovie"
        >
        </list-movies-carousel>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movies {
  margin: 0 auto;
  max-width: 750px;
  &__error {
    color: $fs-white;
    height: 100%;
    font-size: 32px;
    line-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__title {
    color: $fs-white;
    font-size: 32px;
    line-height: 44px;
    text-align: center;
    margin-bottom: 20px;
  }
  &__loader {
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
</style>
