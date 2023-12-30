<script setup>
import { defineProps, toRefs } from "vue";
const emits = defineEmits(["onClick"]);

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: "default",
  },
  nativeType: {
    type: String,
    required: true,
    default: "button",
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});

const { type, nativeType } = toRefs(props);

const handleClick = () => {
  emits("onClick");
};
</script>

<template>
  <el-button
    :disabled="disabled"
    :native-type="nativeType"
    :type="type"
    @click="handleClick"
    ><slot
  /></el-button>
</template>

<style lang="scss" scoped></style>
