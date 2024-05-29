<template>
  <el-container v-if="navbarType === '左侧菜单模式'">
    <el-aside :width="sidebarWidth">
      <side-bar :showLogo="true"></side-bar>
    </el-aside>
    <el-container>
      <el-header>
        <nav-bar></nav-bar>
      </el-header>
      <tabs></tabs>
      <el-main>
        <slot name="home"></slot>
      </el-main>
    </el-container>
  </el-container>

  <el-container v-else-if="navbarType === '顶部菜单混合模式'">
    <el-header>
      <nav-bar :showLogo="true"></nav-bar>
    </el-header>
    <el-container>
      <el-aside :width="sidebarWidth">
        <side-bar></side-bar>
      </el-aside>
      <el-container direction="vertical">
        <tabs></tabs>
        <main class="el-main">
          <slot name="home"></slot>
        </main>
      </el-container>
    </el-container>
  </el-container>

  <el-container v-else-if="navbarType === '顶部菜单模式'">
    <el-header>
      <nav-bar :showLogo="true">
        <template v-slot:sidebar>
          <side-bar mode="horizontal"></side-bar>
        </template>
      </nav-bar>
    </el-header>
    <el-container direction="vertical">
      <tabs></tabs>
      <el-main>
        <slot name="home"></slot>
      </el-main>
    </el-container>
  </el-container>

  <el-container v-else>
    <el-aside width="80px">
      <side-bar :showLogo="true" :collapse="true"></side-bar>
    </el-aside>
    <el-container>
      <el-header>
        <nav-bar></nav-bar>
      </el-header>
      <tabs></tabs>
      <el-main>
        <slot name="home"></slot>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import { computed } from "vue";
import { SideBar, NavBar, Tabs } from "./components/layout.js";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();

// 获取当前路径
const currentPath = computed(() => {
  return route.path;
});

// 导航栏类型
const navbarType = computed(() => {
  return store.state.navbarType;
});

// 是否折叠菜单
const isCollapse = computed(() => {
  return store.state.isCollapse;
});

// 侧边栏宽度
const sidebarWidth = computed(() => {
  return store.state.isCollapse ? "64px" : "200px";
});
</script>
<style></style>
