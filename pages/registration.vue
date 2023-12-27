<script setup>
// import { onMounted, ref } from "vue";
// import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

import { useHead } from "#app";

useHead({
  title: "Registration",
});

definePageMeta({ layout: "auth" });

const router = useRouter();
const authStore = useAuthStore();
const checked = ref(false);
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
      message: "Please input email address",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
    { min: 3, message: "The length should be from 3", trigger: "blur" },
  ],
});

const sendForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid && checked.value) {
      authStore.addUser(data);
      if (authStore.similarEmail) {
        router.push("/auth");
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
        <h2 class="auth__title">Registration</h2>
        <el-form-item
          class="form__item"
          label="Enter email address"
          prop="email"
        >
          <BaseInput v-model="data.email" :type="'text'" />
        </el-form-item>
        <el-form-item class="form__item" label="Enter password" prop="password">
          <BaseInput v-model="data.password" :type="'text'" />
        </el-form-item>
        <div class="auth__checkbox">
          <el-checkbox v-model="checked" size="large" />
          <p>
            I agree to the <span>Terms of Service</span> and
            <span>Privacy Policy</span>, which may be updated from time to time,
            or may have been amended by mutual agreement between movie finder
            and the company subscribed to the service
          </p>
        </div>
        <BaseButton
          type="primary"
          :disabled="data.email && data.password && !checked"
          @click="sendForm(ruleFormRef)"
          >Sing Up</BaseButton
        >
        <!-- <div class="auth__buttons">
          <BaseButton type="default">Cancel</BaseButton>
        </div> -->
        <NuxtLink class="auth__link" to="/auth"> Log in → </NuxtLink>
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
    background-color: #fff;
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
  &__checkbox {
    display: flex;
    font-size: 12px;
    span {
      color: #033ad2;
      cursor: pointer;
    }
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
