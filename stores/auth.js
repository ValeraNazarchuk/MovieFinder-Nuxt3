import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookie } from "nuxt/app";

export const useAuthStore = defineStore("authStore", () => {
  const similarEmail = ref(true);

  const users = useCookie("users", {
    default: () => [],
  });

  const addUser = (userObject) => {
    const foundUser = users.value.find(
      (user) => user.email === userObject.email
    );
    if (!foundUser) {
      users.value.push(userObject);
      similarEmail.value = true;
    } else {
      similarEmail.value = false;
    }
  };

  function checkCredentials(userObject) {
    const foundUser = users.value.find(
      (user) => user.email === userObject.email
    );

    if (!foundUser) {
      return false;
    }

    return foundUser.password === userObject.password;
  }

  return {
    similarEmail,
    users,
    addUser,
    checkCredentials,
  };
});
