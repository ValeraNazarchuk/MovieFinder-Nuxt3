<template>
  <Teleport to="body">
    <div class="modal">
      <div
        class="modal__overlay"
        :class="{ active: isModal }"
        @click="closeModal"
      ></div>
      <div class="modal__container" :class="{ active: isModal }">
        <div class="modal-header">
          <div class="modal-header__content">
            <slot name="header"></slot>
          </div>
          <button class="modal-header__close" @click="closeModal">
            <IconCloseModal />
          </button>
          <div class="modal-header__bg">
            <img src="@/assets/images/pattern.svg" alt="pattern" />
          </div>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import IconCloseModal from "@/components/icons/IconCloseModal";

const emit = defineEmits(["onCloseModal"]);

defineProps({
  isModal: {
    type: Boolean,
    required: true,
  },
});

const closeModal = () => {
  emit("onCloseModal");
};
</script>
<style src="assets/scss/partials/modal.scss" lang="scss" scoped></style>
