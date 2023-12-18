// core
import { useCookie, navigateTo } from "nuxt/app";
import { defineNuxtRouteMiddleware } from "nuxt/app";

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("token").value;

  if (token) {
    return navigateTo("/profile");
  }
});
