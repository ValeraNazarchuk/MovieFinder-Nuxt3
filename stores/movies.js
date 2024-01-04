import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/services/api";
import { useNotificationStore } from "@/stores/notifications.js";

export const useMoviesStore = defineStore("moviesStore", () => {
  const { error } = useNotificationStore();
  const loading = ref(false);
  const movies = ref([]);
  const movie = ref({});

  const getListMovies = async (movie, page) => {
    loading.value = true;
    try {
      const response = await api(`?s=${movie}&page=${page}`);
      if (!response.error.value) {
        movies.value = JSON.parse(response.data.value).Search;
      } else {
        error(response.error.value);
      }
    } catch (errorText) {
      console.log(errorText);
      error(`Error fetching movies:${errorText}`);
    } finally {
      loading.value = false;
    }
  };

  const getDetailedMovie = async (movieId) => {
    loading.value = true;
    try {
      const response = await api(`?i=${movieId}`);
      if (!response.error.value) {
        movie.value = JSON.parse(response.data.value);
      } else {
        error(response.error.value);
      }
    } catch (errorText) {
      error(`Error fetching movie:${errorText}`);
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
