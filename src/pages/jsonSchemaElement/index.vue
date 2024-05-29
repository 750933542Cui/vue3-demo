<template>
  <div class="jsonSchemaElement">
    <vue-form
      v-model="formData"
      :fallback-label="true"
      :schema="schema"
      :form-props="{
        popover: {
          show: true,
          placement: 'top-start',
          title: 'Title',
          width: '200',
          trigger: 'hover',
          content: 'this is content, this is content, this is content',
        },
      }"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
defineOptions({ name: "JsonSchemaElement" });


// monaco json编辑器

// const strFun = `(() => {
//         return (parent, root, prop,type) => {
//           console.log(parent, root, prop,type);
//           return true;
//         };
//       })()`;

// @ts-ignore
// const placeholderFun = (...args: any) => {
//   const bindFun = eval(strFun).bind(null, ...args, "type");
//   return bindFun();
// };

const formData = ref({});
const schema = ref({
  title: "UserInfo 表单",
  description: "A simple form example.",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
      default: "Jun",
      "fui:hidden": () => true,
      // "fui:hidden": () => false,
      "ui:hidden": true,
      // "ui:hidden": false,
    },
    lastName: {
      type: "string",
      title: "Last name",
    },
    age: {
      type: "integer",
      title: "Age",
      maximum: 80,
      minimum: 16,
    },
    bio: {
      type: "string",
      title: "Bio",
      minLength: 10,
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 3,
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10,
    },
  },
});
</script>
<style scoped lang="less">
.jsonSchemaElement {
  width: 400px;
}
</style>
