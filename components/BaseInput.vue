<script setup>
import { defineProps, defineEmits, toRefs } from "vue";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
const { modelValue, type } = toRefs(props);
const showPassword = type.value === "password" ? true : false;
</script>

<template>
  <el-input
    class="field-input"
    :model-value="modelValue"
    :type="type"
    :show-password="showPassword"
    @input="emits('update:modelValue', $event)"
  />
</template>

<style lang="scss" scoped>
.field-input {
  color: $fs-white;
  &::placeholder {
    color: $fs-white;
  }
}
</style>
