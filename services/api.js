// core
import { useFetch } from "@vueuse/core";
import { useRuntimeConfig } from "nuxt/app";

export const api = async (params) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  const apiKey = config.public.apiKey;
  const { data, error } = await useFetch(`${baseURL}${params}&${apiKey}`);

  return { data, error };
};
