<template>
  <div class="default">
    <TheHeader />
    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.default {
  position: relative;
}

.main {
  background-color: #484747;
  padding: 20px 0;
}
</style>
