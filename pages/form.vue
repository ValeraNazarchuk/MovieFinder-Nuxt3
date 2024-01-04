<script setup>
import { ref, reactive } from "vue";
import { useHead } from "#app";
import { useNotificationStore } from "@/stores/notifications.js";

useHead({
  title: "Form",
});

const { error, success } = useNotificationStore();
const showUpload = ref(true);

const data = reactive({
  title: "",
  poster: null,
  director: "",
  year: "",
});

const validateYear = (rule, value, callback) => {
  const valueLength = value.toString().split("").length;
  if (!value) {
    return callback(new Error("Please input the Year"));
  }
  if (!Number.isInteger(value)) {
    callback(new Error("Year must be a number"));
  } else if (valueLength < 4) {
    callback(new Error("The length should be from 4"));
  } else {
    callback();
  }
};

const ruleFormRef = ref();
const rules = reactive({
  title: [
    {
      required: true,
      message: "Please input title movie",
      trigger: "blur",
    },
    { min: 3, message: "The length should be from 3", trigger: "blur" },
  ],
  year: [
    { required: true, message: "Please input year movie", trigger: "blur" },
    { validator: validateYear, trigger: "blur" },
  ],
  director: [
    {
      required: true,
      message: "Please input movie director",
      trigger: "blur",
    },
    { min: 3, message: "The length should be from 3", trigger: "blur" },
  ],
  poster: [
    { required: true, message: "Please insert poster", trigger: "change" },
  ],
});

const sendForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(`
        Title: ${data.title}
        Year: ${data.year}
        Director: ${data.director}
        Poster: ${data.poster}
        `);

      data.title = "";
      data.year = "";
      data.poster = null;

      showUpload.value = false;

      success("Movie added");
    } else {
      error("Please fill out the form correctly");
    }
  });
};

const handleImageUploaded = (url) => {
  data.poster = url;
};
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="data"
    :rules="rules"
    class="form"
    label-position="top"
    label-width="120px"
    status-icon
    @submit.prevent="sendForm(ruleFormRef)"
  >
    <h3 class="form__title">Add movie</h3>
    <el-form-item class="form__item" label="Enter Title" prop="title">
      <BaseInput v-model="data.title" />
    </el-form-item>
    <el-form-item class="form__item" label="Enter Year" prop="year">
      <BaseInput v-model.number="data.year" />
    </el-form-item>
    <el-form-item class="form__item" label="Enter Director" prop="director">
      <BaseInput v-model="data.director" />
    </el-form-item>
    <el-form-item class="form__item" label="Enter Poster" prop="poster">
      <FormUploadFile
        :show-upload="showUpload"
        @image-uploaded="handleImageUploaded"
      />
    </el-form-item>
    <el-form-item>
      <BaseButton native-type="submit" type="primary"> Send </BaseButton>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.form {
  margin: 0 auto;
  max-width: 500px;
  &__title {
    color: $fs-white;
    text-align: center;
    font-size: 32px;
    line-height: 46px;
  }
}
</style>
