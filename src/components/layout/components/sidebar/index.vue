<template>
  <el-menu
    :default-active="activeMenu"
    :unique-opened="true"
    :mode="mode"
    router
    :collapse="isCollapse && mode !== 'horizontal'"
    :class="{ 'no-transition': isCollapse }"
  >
    <logo v-if="isShowLogo"></logo>
    <side-bar-item
      v-for="item in menuList"
      :key="item.menuId"
      :item="item"
      :collapse="collapse"
    ></side-bar-item>
  </el-menu>
</template>

<script setup>
import Logo from "../Logo.vue";
import SideBarItem from "./SideBarItem.vue";
import { useSideBarHook } from "./use-side-bar-hook.ts";

const props = defineProps({
  mode: String,
  showLogo: Boolean,
  collapse: Boolean,
});

const { activeMenu, menuList, isShowLogo, isCollapse } = useSideBarHook(props);
</script>

<style></style>
