<script setup>
import { defineEmits, toRefs } from "vue";

const emits = defineEmits(["image-uploaded"]);

const props = defineProps({
  showUpload: {
    type: Boolean,
    required: true,
  },
});

const { showUpload } = toRefs(props);

const handleChange = (file) => {
  const url = URL.createObjectURL(file.raw);

  emits("image-uploaded", url);
};
</script>

<template>
  <el-upload
    class="upload-demo"
    :auto-upload="false"
    :on-change="handleChange"
    :limit="1"
    :show-file-list="showUpload"
  >
    <template #tip>
      <div class="el-upload__tip">
        limit 1 file, delete the previous poster before installing the new one
      </div>
    </template>
    <template #trigger>
      <el-button type="default">Select poster</el-button>
    </template>
  </el-upload>
</template>

<style lang="scss" scoped>
.upload-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 0px 20px;
}

.el-upload__tip {
  color: $fs-white;
}
</style>
