// core
import { useCookie } from "nuxt/app";

export function setTokenData(data) {
  const token = useCookie("token");
  const refreshToken = useCookie("refreshToken");

  token.value = data.token;
  refreshToken.value = data.refreshToken;
  removeAnonymousTokenData();
}

export function setAnonymousTokenData(data) {
  const refreshToken = useCookie("anonymousRefreshToken");
  const anonymousToken = useCookie("anonymousToken");

  anonymousToken.value = data.token;
  refreshToken.value = data.refreshToken;
}

export function removeAnonymousTokenData() {
  const refreshToken = useCookie("anonymousRefreshToken");
  const anonymousToken = useCookie("anonymousToken");

  anonymousToken.value = null;
  refreshToken.value = null;
}

export function removeTokenData() {
  const token = useCookie("token");
  const refreshToken = useCookie("refreshToken");

  token.value = null;
  refreshToken.value = null;
}
