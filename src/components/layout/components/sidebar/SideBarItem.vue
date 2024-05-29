<template>
  <el-sub-menu :index="item.menuId" v-if="item.children.length > 0">
    <template #title>
      <el-icon><location /></el-icon>
      <span>{{ item.menuName }}</span>
    </template>
    <side-bar-item
      v-for="inner in item.children"
      :key="inner.menuId"
      :item="inner"
    ></side-bar-item>
  </el-sub-menu>
  <el-menu-item :index="item.menuId" v-else @click="handleMenu(item)">
    <el-icon><setting /></el-icon>
    <span v-if="collapse">{{ item.menuName }}</span>
    <template #title>{{ item.menuName }}</template>
  </el-menu-item>
</template>

<script setup>
import { setTabs, getTabs } from "@utils/storage";
import { Location, Setting } from "@element-plus/icons-vue";
import { useStore } from "vuex";

defineOptions({ name: "SideBarItem" });

const props = defineProps({
  item: {
    type: Object,
  },
  collapse: {
    type: Boolean,
  },
});

const store = useStore();

// 点击菜单回调
const handleMenu = (obj) => {
  const { menuId, menuName } = obj;
  let tabs = getTabs();
  let flag = true;
  tabs.forEach((item) => {
    if (item.id === menuId) {
      flag = false;
    }
  });
  if (flag) {
    tabs.push({
      id: menuId,
      name: menuName,
      active: true,
    });
  }
  store.commit("getActiveMenu", menuId);
  setTabs(tabs, menuId);
};
</script>

<style></style>
