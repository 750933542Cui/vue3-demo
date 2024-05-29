<template>
  <layout>
    <template #home>
      <router-view></router-view>
    </template>
  </layout>
</template>

<script>
import Layout from "./Layout.vue";
export default {
  components: { Layout },
};
</script>

<style></style>
