// core
import { useFetch } from "@vueuse/core";
// const baseURL = import.meta.env.NUXT_PUBLIC_BASE_URL;
// const baseKEY = import.meta.env.NUXT_API_KEY;

export const api = async (params) => {
  const { data: movies } = await useFetch(
    `http://www.omdbapi.com/${params}&apikey=738daa61`
  );
  return JSON.parse(movies._rawValue);
};
// export const api = async (params) => {
//   const { data: movies } = await useAsyncData("movies", () =>
//     $fetch(`http://www.omdbapi.com/${params}&apikey=738daa61`)
//   );
// };
