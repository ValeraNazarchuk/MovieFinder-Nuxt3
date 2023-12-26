import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useFavoriteMoviesStore = defineStore("favoriteMoviesStore", () => {
  const loading = ref(false);
  const movies = ref([]);

  const moviesOnLocalStorage = localStorage.getItem("movies");
  if (moviesOnLocalStorage) {
    movies.value = JSON.parse(moviesOnLocalStorage)._value;
  }

  const addMovie = (movie) => {
    movies.value.unshift(movie);
  };

  const deleteMovie = (movieId) => {
    movies.value = movies.value.filter((el) => movieId !== el.imdbID);
  };

  watch(
    () => movies,
    (state) => {
      localStorage.setItem("movies", JSON.stringify(state));
    },
    { deep: true }
  );

  return {
    loading,
    movies,
    addMovie,
    deleteMovie,
  };
});
