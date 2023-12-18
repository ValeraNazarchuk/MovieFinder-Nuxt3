<template>
  <el-upload
    :file-list="list"
    :on-change="onUploadImage"
    :on-remove="onRemoveImage"
    :auto-upload="false"
    :limit="10"
    multiple
    list-type="picture-card"
  >
    <div v-if="list.length <= 9">
      <div v-if="list.length" class="support__add-photos">
        <el-icon>
          <IconPlusButton />
        </el-icon>
        Add Photos
      </div>
      <div v-else class="support__add-empty">
        <el-icon>
          <IconPlusButton />
        </el-icon>
        Add Photos
      </div>
    </div>
  </el-upload>
</template>

<script setup>
import { useFileStore } from "@/stores/uploadFile";
import IconPlusButton from "@/components/icons/IconPlusButton";
const fileStore = useFileStore();

const emit = defineEmits(["onFileUpload", "onFileRemove"]);

defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const onUploadImage = async (uploadFile) => {
  const file = await fileStore.uploadFile(uploadFile.raw);
  if (file) {
    emit("onFileUpload", file);
  }
  return false;
};

const onRemoveImage = (file) => {
  emit("onFileRemove", file.id);
};
</script>
<style lang="scss" scoped>
.support__add-empty {
  display: flex;
  align-items: center;
  color: $orange;
  white-space: nowrap;
  @include fw-regular;
}
.support__add-photos {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 14px;
  color: $orange;
  border-radius: 4px;
  border: 1px solid $gray_cold_30;
  background: $gray_cold_03;
  @include body-s;
  @include fw-regular;
}
:deep(.el-upload-list__item.is-ready) {
  display: none;
}
:deep(.el-upload-list__item-thumbnail) {
  object-fit: cover;
}
:deep(.el-upload-list) {
  align-items: center;
  gap: 8px;
  justify-content: center;

  .el-upload-list--picture-card {
    align-items: center;
  }
  .el-upload-list__item {
    max-width: 94px;
    max-height: 94px;
    margin-bottom: 0;
  }

  .add-photos {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #b8c4cb;
    background: #f8f9fa;
    padding: 24px 16px;
    color: $orange;
    text-align: center;
    @include body-s;
  }

  .el-upload-list__item-status-label {
    display: none;
  }

  .el-upload-list__item-actions {
    .el-upload-list__item-preview {
      display: none;
    }
    .el-upload-list__item-delete {
      margin-left: 0;
    }
  }

  .el-upload--picture-card {
    width: 94px;
    height: 94px;
    background-color: inherit;
    border: inherit;
    border-radius: inherit;
  }
}
</style>
