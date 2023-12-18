// core
import { defineStore } from "pinia";
import { navigateTo } from "nuxt/app";

// services
import { api } from "@/services/api";
import {
  removeTokenData,
  setAnonymousTokenData,
  setTokenData,
} from "@/services/auth";

// stores
import { useNotificationStore } from "@/stores/notifications";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    signInLoading: false,
    signUpLoading: false,
    forgotPasswordLoading: false,
    resetPasswordLoading: false,
  }),
  actions: {
    async login(payload) {
      this.signInLoading = true;
      try {
        const data = await api("/login", {
          method: "POST",
          body: payload,
        });
        if (data) {
          await setTokenData(data);
          await this.fetchUser();
          navigateTo("/map");
        }
      } catch (error) {
        useNotificationStore().failed(error);
      } finally {
        this.signInLoading = false;
      }
    },
    async signUp(payload) {
      this.signUpLoading = true;
      try {
        const data = await api(`/application-users`, {
          method: "POST",
          body: payload,
        });
        if (data) {
          await setTokenData(data);
          await this.fetchUser();
          navigateTo("/map");
        }
        return data;
      } catch (error) {
        useNotificationStore().failed(error);
      } finally {
        this.signUpLoading = false;
      }
    },
    async fetchUser() {
      try {
        this.user = await api("/application-users/me");
      } catch (error) {
        useNotificationStore().failed(error);
      }
    },
    async logoutHandler() {
      try {
        await api("/logout", {
          method: "POST",
        }).then(() => {
          navigateTo("/");
          removeTokenData();
          this.user = null;
        });
      } catch (error) {
        useNotificationStore().failed(error);
      }
    },
    async logout() {
      try {
        navigateTo("/");
        removeTokenData();
        this.user = null;
      } catch (error) {
        useNotificationStore().failed(error);
      }
    },
    async anonymousToken() {
      try {
        const data = await api("/token");
        await setAnonymousTokenData(data);
      } catch (error) {
        useNotificationStore().failed(error);
      }
    },
    async refreshToken(payload) {
      const data = await api("/token/refresh", {
        method: "POST",
        body: payload,
      });
      await setTokenData(data);
    },
    async forgotPassword(payload) {
      this.forgotPasswordLoading = true;
      try {
        await api("/password/reset", {
          method: "POST",
          body: {
            email: payload,
          },
        }).then(() => {
          useNotificationStore().success("Check your email for letter");
          navigateTo("/auth/sign-in");
        });
      } catch (error) {
        useNotificationStore().failed(error);
      } finally {
        this.forgotPasswordLoading = false;
      }
    },
    async resetPassword(token, payload) {
      this.resetPasswordLoading = true;
      try {
        const data = await api(`/password/reset/${token}`, {
          method: "POST",
          body: payload,
        });
        if (data) {
          await setTokenData(data);
          await this.fetchUser();
          navigateTo("/profile");
        }
        return data;
      } catch (error) {
        useNotificationStore().failed(error);
      } finally {
        this.resetPasswordLoading = false;
      }
    },
  },
});
