<script setup>
// import { onMounted, ref } from "vue";
// import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import { useHead } from "#app";

useHead({
  title: "Login",
});

definePageMeta({ layout: "auth" });

const router = useRouter();
const authStore = useAuthStore();
const data = reactive({
  email: "",
  password: "",
});

const ruleFormRef = ref();
const rules = reactive({
  email: [
    {
      type: "email",
      required: true,
      message: "Please input your email address",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Please input your password", trigger: "blur" },
  ],
});

const sendForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const result = authStore.checkCredentials(data);
      if (result) {
        router.push("/");
      } else {
        alert("Ви неправльно ввели email або password");
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<template>
  <div class="auth__container">
    <div class="auth__content">
      <el-form
        ref="ruleFormRef"
        :model="data"
        :rules="rules"
        class="auth__form"
        label-position="top"
        label-width="120px"
        status-icon
        @submit.prevent
      >
        <h2 class="auth__title">Log in to your account</h2>
        <el-form-item
          class="form__item"
          label="Enter email address"
          prop="email"
        >
          <BaseInput v-model="data.email" :type="'text'" />
        </el-form-item>
        <el-form-item class="form__item" label="Enter password" prop="password">
          <BaseInput v-model="data.password" :type="'password'" />
        </el-form-item>
        <BaseButton type="primary" @click="sendForm(ruleFormRef)"
          >Log in</BaseButton
        >
        <!-- <div class="auth__buttons">
          <BaseButton type="default">Cancel</BaseButton>
        </div> -->
        <NuxtLink class="auth__link" to="/registration"> Sign up → </NuxtLink>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  &__container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    height: 400px;
    width: 500px;
    background-color: $bg-white;
    padding: 40px;
    text-align: center;
    border-radius: 20px;
  }
  &__form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: $fs-black;
  }

  &__title {
    font-weight: 700;
    font-size: 30px;
    line-height: normal;
  }

  // &__buttons {
  //   display: flex;
  //   justify-content: center;
  //   gap: 18px;
  //   margin-bottom: 20px;
  // }
  &__link {
    margin: 15px auto 0px;
  }
}

:deep(.el-form-item__label) {
  color: $black !important;
}
</style>
