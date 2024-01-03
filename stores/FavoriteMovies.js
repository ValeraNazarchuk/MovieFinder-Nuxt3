import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookie } from "nuxt/app";

export const useFavoriteMoviesStore = defineStore("favoriteMoviesStore", () => {
  const loading = ref(false);
  const movies = useCookie("movies", {
    default: () => [],
  });

  const addMovie = (movie) => {
    const newObjectMovie = {
      Title: movie.Title,
      Year: movie.Year,
      imdbID: movie.imdbID,
      Poster: movie.Poster,
    };
    movies.value.unshift(newObjectMovie);
  };

  const deleteMovie = (movieId) => {
    movies.value = movies.value.filter((el) => movieId !== el.imdbID);
  };

  return {
    loading,
    movies,
    addMovie,
    deleteMovie,
  };
});
