/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "@vue/eslint-config-prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/multi-word-component-names": 0,
    "vue/no-multiple-template-root": "off",
    "vue/v-on-event-hyphenation": 0,
    "vue/no-v-html": "off",
  },
};
