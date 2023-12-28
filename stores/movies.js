import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/services/api";

export const useMoviesStore = defineStore("moviesStore", () => {
  const loading = ref(false);
  const movies = ref([]);
  const movie = ref({});

  const getListMovies = async (movie, page) => {
    loading.value = true;
    try {
      const response = await api(`?s=${movie}&page=${page}`);
      movies.value = JSON.parse(response.data.value).Search;
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      loading.value = false;
    }
  };

  const getDetailedMovie = async (movieId) => {
    loading.value = true;
    try {
      const response = await api(`?i=${movieId}`);
      movie.value = JSON.parse(response.data.value);
    } catch (error) {
      console.error("Error fetching movie:", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    movies,
    movie,
    getListMovies,
    getDetailedMovie,
  };
});
