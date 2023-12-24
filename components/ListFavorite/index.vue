<script setup>
import { defineProps, toRefs } from "vue";

const emits = defineEmits(["onWatch", "deleteMovie"]);

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

const { movies } = toRefs(props);

const handleChange = (movieId) => {
  emits("deleteMovie", movieId);
};

const watchMovieClick = (movieId) => {
  emits("onWatch", movieId);
};
</script>

<template>
  <ul class="movies__list">
    <li v-for="movie in movies" :key="movie.imdbID" class="movies__list-item">
      <ListFavoriteContent :movie="movie" />
      <div class="movies__list-buttons">
        <BaseButton
          class="movies__list-open"
          :type="'primary'"
          @onClick="watchMovieClick(movie)"
        >
          Open
        </BaseButton>

        <BaseButton
          class="movies__list-delete"
          :type="'danger'"
          @onClick="handleChange(movie.imdbID)"
        >
          Delete
        </BaseButton>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.movies {
  font-size: 20px;
  line-height: 26px;
  &__list {
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;
    gap: 20px;
    &-item {
      max-width: 250px;
      width: 100%;
      display: flex;
      flex-direction: column;
      color: $fs-white;
      border: 1px solid $border-white;
      background-color: $bg-gray;
      border-radius: 20px;
    }
    &-buttons {
      display: flex;
      align-items: center;
      width: 100%;
    }
    &-open,
    &-delete {
      margin: 0;
      width: 100%;
    }
    &-open {
      border-radius: 0px 0px 0px 20px;
    }
    &-delete {
      border-radius: 0px 0px 20px 0px;
    }
  }
}

// .el-button--primary {
//     margin-top: auto;
//     justify-self: center;
//     border-radius: 0px 0px 20px 20px;
// }
</style>
