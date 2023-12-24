import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useFavoriteMoviesStore = defineStore("favoriteMoviesStore", () => {
  const loading = ref(false);
  const movies = ref([]);

  const cookies = document.cookie;
  const moviesOnCookies = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith("movies="));

  if (moviesOnCookies) {
    movies.value = JSON.parse(moviesOnCookies.split("=")[1]);
  }

  const addMovie = (movie) => {
    movies.value.push(movie);
    updateCookie();
  };

  const deleteMovie = (movieId) => {
    movies.value = movies.value.filter((el) => movieId !== el.imdbID);
    updateCookie();
  };

  const updateCookie = () => {
    document.cookie = `movies=${JSON.stringify(
      movies.value
    )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/;`;
  };

  watch(
    () => movies,
    () => {
      updateCookie();
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
