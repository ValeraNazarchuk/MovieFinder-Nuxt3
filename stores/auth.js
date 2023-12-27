import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const users = ref([]);
  const similarEmail = ref(true);

  const cookies = document.cookie;
  const usersOnCookies = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith("users="));

  if (usersOnCookies) {
    users.value = JSON.parse(usersOnCookies.split("=")[1]);
  }

  const addUser = (userObject) => {
    const foundUser = users.value.find(
      (user) => user.email === userObject.email
    );
    if (!foundUser) {
      users.value.push(userObject);
      updateCookie();
      similarEmail.value = true;
    } else {
      similarEmail.value = false;
      alert("Користувач з таким email вже створений");
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

  const updateCookie = () => {
    document.cookie = `users=${JSON.stringify(
      users.value
    )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/;`;
  };

  watch(
    () => users,
    () => {
      updateCookie();
    },
    { deep: true }
  );

  return {
    similarEmail,
    users,
    addUser,
    checkCredentials,
  };
});
