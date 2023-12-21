<script setup>
import { defineProps, defineEmits, toRefs } from "vue";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
});
const { modelValue } = toRefs(props);
</script>

<template>
  <el-input
    class="field-input"
    :model-value="modelValue"
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
