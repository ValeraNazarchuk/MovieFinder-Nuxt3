<script setup>
import { computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMoviesStore } from "@/stores/movies";
import { useFavoriteMoviesStore } from "@/stores/FavoriteMovies";

import { useHead } from "#app";

useHead({
  title: "detailed",
});

const router = useRouter();
const route = useRoute();
const movieStore = useMoviesStore();
const favoriteMoviesStore = useFavoriteMoviesStore();
const movie = computed(() => {
  return movieStore.movie;
});

const auditId = (movieId) => {
  const exists = favoriteMoviesStore.movies.some((el) => el.imdbID === movieId);
  return exists;
};

// await movieStore.getDetailedMovie(route.params.id);
onMounted(async () => {
  await movieStore.getDetailedMovie(route.params.id);
});
</script>

<template>
  <div v-if="movieStore.loading" class="loader-container">
    <base-loader />
  </div>
  <div v-else class="movie">
    <div class="movie__inner">
      <div class="movie__content">
        <BaseButton
          native-type="button"
          type="primary"
          @onClick="router.back()"
        >
          Back
        </BaseButton>
        <h3 class="movie__content-title">{{ movie.Title }}</h3>
        <p>
          IMDb: <strong>{{ movie.imdbRating }}</strong>
        </p>
        <p>
          Year: <strong>{{ movie.Year }}</strong>
        </p>
        <p>
          Plot: <strong> {{ movie.Plot }} </strong>
        </p>
        <p>
          Writer: <strong> {{ movie.Writer }} </strong>
        </p>
      </div>
      <div class="movie__images">
        <div class="movie__images-box">
          <img v-if="movie.Poster !== 'N/A'" :src="movie.Poster" alt="poster" />
          <el-empty v-else :image-size="200" description="No photo" />
        </div>
        <div class="movie__images-buttons">
          <BaseButton
            v-show="!auditId(movie.imdbID)"
            native-type="button"
            type="success"
            @onClick="favoriteMoviesStore.addMovie(movie)"
          >
            Add in the favorite movies
          </BaseButton>
          <BaseButton
            v-show="auditId(movie.imdbID)"
            native-type="button"
            type="danger"
            @onClick="favoriteMoviesStore.deleteMovie(movie.imdbID)"
          >
            Delete with favorite list
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie {
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  &__content {
    color: $fs-white;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 600px;

    &-title {
      font-size: 30px;
      line-height: 38px;
    }

    strong {
      font-size: 16px;
    }
  }

  &__images {
    gap: 10px;
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin-left: 20px;
    &-box {
      img {
        border-radius: 30px;
      }
    }
    &-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
.el-button--primary {
  width: 100px;
}
</style>
