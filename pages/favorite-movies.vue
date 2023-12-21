<script setup>
import { useRouter } from "vue-router";
// import { useFavoriteMoviesStore } from "@/stores/FavoriteMovies";

// const favoriteMoviesStore = useFavoriteMoviesStore();

const router = useRouter();

const watchMovie = (movie) => {
  // router.push(`/detailed-movies/${movie.imdbID}`);
};
</script>

<template>
  <div class="movies">
    <p>FavoriteMovies</p>
    <!-- <h2 v-if="favoriteMoviesStore.movies.length === 0" class="movies__error">
      List is empty
    </h2>
    <div v-else>
      <h2 class="movies__title">Movies</h2>
      <list-movies
        :movies="favoriteMoviesStore.movies"
        @deleteMovie="favoriteMoviesStore.deleteMovie"
        @onWatch="watchMovie"
      />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.movies {
  margin: 0 auto;
  max-width: 900px;
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
