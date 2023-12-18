<template>
  <section class="error">
    <div class="error__container">
      <div class="error-content">
        <div class="error-content__image">
          <nuxt-img
            class="error-image error-image--bg"
            src="/images/error-page/img_bg.svg"
            alt="error-background"
          />
          <nuxt-img
            class="error-image error-image--404"
            src="/images/error-page/img_404.svg"
            alt="404image"
          />
        </div>
        <p class="error-content__text">
          Sorry, the page you are looking for was not found
        </p>
        <div class="error-content__btn">
          <NuxtLink to="/map">
            <el-button class="el-button el-button--primary"
              >Go to map</el-button
            >
          </NuxtLink>
          <NuxtLink to="/">
            <el-button class="el-button el-button--simple">Info</el-button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="error__background">
      <div class="error-item error-item--top-left">
        <nuxt-img src="/images/pattern.svg" alt="pattern" />
      </div>
      <div class="error-round error-round--left"></div>
      <div class="error-item error-item--top-right">
        <nuxt-img src="/images/pattern.svg" alt="pattern" />
      </div>
      <div class="error-round error-round--right"></div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({ layout: "error404" });
</script>

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

    @include devices(tablet) {
      padding: 0 150px 90px;
    }
  }

  &-content {
    display: flex;
    align-items: center;
    flex-direction: column;

    &__text {
      @include H5;
      @include fw-regular;
      color: $gray;
      margin-bottom: 32px;
    }

    &__btn {
      display: flex;

      &:not(:last-child) {
        margin-right: 0;
      }
    }
    &__image {
      display: flex;
      justify-content: center;
      position: relative;
      width: 249px;
      margin-bottom: 24px;

      .error-image--bg {
        text-align: center;
        width: 190px;
        height: 190px;
      }

      .error-image--404 {
        position: absolute;
        top: 19px;
        left: 0;
        width: 249px;
      }
    }
    .error-image--bg {
      text-align: center;
      width: 190px;
      height: 190px;
    }

    .error-image--404 {
      position: absolute;
      top: 19px;
      left: 0;
      width: 249px;
    }
  }

  @include devices(mobile-tablet) {
    .error {
      &__background {
        display: none;
      }
    }
  }

  &__background {
    pointer-events: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }

  &-item {
    position: absolute;
    width: 50%;
    z-index: 1;

    &--top-left {
      opacity: 0.3;
      left: -25%;
      top: 50%;
      transform: translateY(-50%) rotate(90deg);
    }

    &--top-right {
      opacity: 0.3;
      right: -25%;
      top: 60%;
      transform: translateY(-50%) rotate(-90deg);
    }

    img {
      left: 50%;
      width: 100%;
      object-fit: contain;
    }
  }

  .error-round {
    position: absolute;
    background: #ffe0a4;
    opacity: 0.2;
    filter: blur(103.5px);
    mix-blend-mode: normal;
    width: 40%;
    aspect-ratio: 1;
    z-index: 0;

    &--right {
      right: 0;
      bottom: 30%;
      transform: translate(80%, 10%);
    }

    &--left {
      left: 0;
      bottom: 30%;
      transform: translate(-80%, 10%);
    }
  }

  .el-button {
    width: 149px;
    height: 40px;
    margin-right: 12px;
  }
}
</style>
