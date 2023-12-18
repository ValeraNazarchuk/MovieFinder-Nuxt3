<template>
  <div class="home">Home page</div>
</template>
<script setup>
// core
import { useHead } from "#app";

definePageMeta({ layout: "default", middleware: ["default"] });

useHead({
  title: "base-nuxt-setup",
  link: [
    {
      rel: "canonical",
      href: "link",
    },
  ],
  meta: [
    {
      key: "title",
      name: "title",
      content: "content",
    },
    {
      key: "description",
      name: "description",
      content: "content",
    },
    {
      hid: "og:image",
      property: "og:image",
      size: "width: 1200,  height: 630,",
      content: "/images/og-img.webp",
    },
    {
      hid: "image",
      property: "image",
      size: "width: 1200,  height: 630,",
      content: "/images/og-img.webp",
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
  ],
});
</script>
