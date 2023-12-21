<template>
  <div class="home">
    <h1 class="home__title">Search movie:</h1>
    <el-form
      ref="ruleFormRef"
      class="home__form"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      status-icon
      @submit.prevent
      @keyup.enter="searchClick(ruleFormRef)"
    >
      <el-form-item label="Search Movie" prop="movieValue">
        <BaseInput v-model="ruleForm.movieValue" />
      </el-form-item>
      <el-form-item>
        <BaseButton :type="'primary'" @onClick="searchClick(ruleFormRef)">
          Search
        </BaseButton>
      </el-form-item>
    </el-form>
  </div>
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

//____ my code
const router = useRouter();

const ruleFormRef = ref();
const rules = reactive({
  movieValue: [
    { required: true, message: "Please input name movie", trigger: "blur" },
    { min: 3, message: "The length should be from 3", trigger: "blur" },
  ],
});
const ruleForm = reactive({
  movieValue: "",
});

const searchClick = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      router.push(`/movies?search=${ruleForm.movieValue}&page=1`);
    } else {
      alert("error submit!", fields);
    }
  });
};
</script>

<style lang="scss" scoped>
.home {
  &__form {
    margin: 0 auto;
    max-width: 500px;
    display: flex;
    flex-direction: column;
  }
  &__title {
    color: $fs-white;
    text-align: center;
    font-size: 30px;
    line-height: 42px;
    margin-bottom: 10px;
  }
}
</style>
