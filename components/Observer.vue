<template>
  <div ref="el" class="observer" />
</template>

<script setup>
// core
import { onMounted, onUnmounted, ref } from "vue";

const emit = defineEmits(["intersect"]);
const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
});

const observer = ref(null);
const el = ref(null);

onMounted(() => {
  const options = props.options || {};

  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit("intersect");
    }
  }, options);

  observer.value.observe(el.value);
});

onUnmounted(() => {
  observer.value.disconnect();
});
</script>
