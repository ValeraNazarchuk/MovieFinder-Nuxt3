<script setup>
import { useRouter } from "~/.nuxt/vue-router";
import { definePageMeta } from "#imports";

definePageMeta({ layout: "error404" });

const router = useRouter();
</script>

<template>
  <section class="error">
    <div class="error__container">
      <div class="error-content">
        <div class="error-content__box">
          <nuxt-img
            class="error-content__box-img"
            src="/error-404.png"
            alt="error-background"
          />
        </div>
        <p class="error-content__text">
          Sorry, the page you are looking for was not found
        </p>
        <div class="error-content__buttons">
          <BaseButton
            native-type="button"
            type="primary"
            class="error-content__button el-button--primary"
            @click="router.push('/')"
            >Go to Home</BaseButton
          >
          <BaseButton
            native-type="button"
            type="default"
            class="error-content__button el-button--info"
            @click="router.push('/')"
            >Info</BaseButton
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  flex-grow: 1;
  &__container {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    padding: 30px 0;
    text-align: center;
  }

  &-content {
    display: flex;
    align-items: center;
    flex-direction: column;

    &__text {
      font-size: 22px;
      color: $fs-white;
      margin-bottom: 32px;
    }
    &__box {
      display: flex;
      justify-content: center;
      position: relative;
      margin-bottom: 24px;

      &-img {
        text-align: center;
        width: 700px;
      }
    }
    &__button {
      width: 149px;
      height: 40px;
      margin-right: 12px;
    }
  }
}
</style>
