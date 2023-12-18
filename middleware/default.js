// core
import { useCookie } from "nuxt/app";
import { defineNuxtRouteMiddleware } from "nuxt/app";

// stores
import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  const token = useCookie("token").value;

  if (token && !authStore.user) {
    await authStore.fetchUser();
  }
});
