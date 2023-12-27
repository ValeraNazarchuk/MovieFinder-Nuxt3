<script setup>
// import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFavoriteMoviesStore } from "@/stores/FavoriteMovies";
import { useHead } from "#app";

useHead({
  title: "Favorite-movies",
});

const favoriteMoviesStore = useFavoriteMoviesStore();
const router = useRouter();

const moviesLimit = ref([]);
const reloading = ref(false);
const loadingFullWindow = ref(false);

const watchMovie = (movie) => {
  router.push(`/movies/${movie.imdbID}`);
};

const loadMore = () => {
  const moviesLength = favoriteMoviesStore.movies.length;

  if (moviesLimit.value.length !== moviesLength && !loadingFullWindow.value) {
    reloading.value = true;
  }

  setTimeout(() => {
    const startIndex = moviesLimit.value.length;
    const newItems = favoriteMoviesStore.movies.slice(
      startIndex,
      startIndex + 9
    );
    moviesLimit.value = [...moviesLimit.value, ...newItems];
    reloading.value = false;
  }, 1000);
};

const updateMoviesLimit = () => {
  moviesLimit.value = favoriteMoviesStore.movies.slice(
    0,
    moviesLimit.value.length
  );
};

watch(
  () => favoriteMoviesStore.movies,
  () => {
    updateMoviesLimit();
  }
);

onMounted(() => {
  loadingFullWindow.value = true;
  setTimeout(() => {
    loadingFullWindow.value = false;
  }, 1500);

  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };

  const callback = (entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  };

  const observerElement = document.getElementById("observerElement");

  const observer = new IntersectionObserver(callback, options);
  observer.observe(observerElement);
});
</script>

<template>
  <div class="movies">
    <h2 v-if="favoriteMoviesStore.movies.length === 0" class="movies__error">
      List is empty
    </h2>
    <div v-else-if="loadingFullWindow" class="loader-container">
      <BaseLoader />
    </div>
    <div v-else>
      <h2 class="movies__title">Movies</h2>
      <ListFavorite
        :movies="moviesLimit"
        @deleteMovie="favoriteMoviesStore.deleteMovie"
        @onWatch="watchMovie"
      />
    </div>
    <div id="observerElement"></div>
    <div v-show="reloading" class="movies__loader">
      <BaseLoader />
    </div>
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
