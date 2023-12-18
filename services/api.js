// core
import { ofetch } from "ofetch";
import { useCookie, useRuntimeConfig } from "nuxt/app";
import jwt_decode from "jwt-decode";
import { stringify } from "qs";

// stores
import { useAuthStore } from "~/stores/auth";

const isValidToken = (token) => {
  try {
    const { exp } = jwt_decode(token);
    return Date.now() <= exp * 1000;
  } catch (error) {
    return false;
  }
};

export const api = (url, { method = "GET", body, params } = {}) => {
  const config = useRuntimeConfig();

  function requestOptions() {
    if (params || (!params && !body)) {
      return {
        key: "params",
        value: params,
      };
    }
    if (body) {
      return {
        key: "body",
        value: body,
      };
    }
  }

  return ofetch(url, {
    baseURL: config.public.baseURL,
    initialCache: false,
    method,
    [requestOptions().key]: requestOptions().value,

    async onRequest({ request, options }) {
      const authStore = useAuthStore();
      if (
        !useCookie("token").value &&
        !isValidToken(useCookie("anonymousToken").value) &&
        !["/token"].includes(request)
      ) {
        await authStore.anonymousToken();
      }
      if (
        useCookie("token").value &&
        !isValidToken(useCookie("token").value) &&
        useCookie("refreshToken").value &&
        !["/token/refresh"].includes(request)
      ) {
        const refresh = await useCookie("refreshToken");
        await authStore.refreshToken({
          refreshToken: refresh.value,
        });
      }

      const token =
        useCookie("token").value || useCookie("anonymousToken").value;
      options.headers = { authorization: "Bearer " + token };

      if (options.params) {
        let convertedOptions = new URLSearchParams(stringify(options.params));
        options.params = Object.fromEntries(convertedOptions);
      }
    },
    onResponse({ response }) {
      return response;
    },
    async onResponseError({ response }) {
      const authStore = useAuthStore();
      if (response.status === 401) {
        await authStore.logout();
      }
    },
  });
};
