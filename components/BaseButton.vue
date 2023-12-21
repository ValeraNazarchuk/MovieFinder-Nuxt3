<script setup>
import { defineProps, toRefs } from "vue";
const emits = defineEmits(["onClick"]);

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});

const { type } = toRefs(props);

const handleClick = () => {
  emits("onClick");
};
</script>

<template>
  <el-button :disabled="disabled" :type="type" @click="handleClick"
    ><slot
  /></el-button>
</template>

<style lang="scss" scoped></style>
