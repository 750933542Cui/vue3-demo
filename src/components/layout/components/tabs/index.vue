<template>
  <div class="tabs-content">
    <div class="tabs-scroll">
      <el-tabs
        v-model="activeMenu"
        type="card"
        @tab-click="handleTag"
        @tab-remove="handleClose"
      >
        <el-tab-pane
          :closable="!item.unCloseable"
          :name="item.id"
          v-for="(item, index) in tabs"
          :key="index"
          :label="item.name"
        >
          {{ item.name }}
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dropdown trigger="click">
      <arrow-down class="tabs-svg border-left" />
      <template #dropdown>
        <el-dropdown-menu class="tabs-menu">
          <el-dropdown-item
            :disabled="disabledCurrent"
            @click="handleMenuClose('current')"
            :icon="Close"
          >
            关闭当前标签页
          </el-dropdown-item>
          <el-divider></el-divider>
          <el-dropdown-item
            :disabled="disabledLeft"
            @click="handleMenuClose('left')"
            :icon="Download"
          >
            关闭左侧标签页
          </el-dropdown-item>
          <el-dropdown-item
            :disabled="disabledRight"
            @click="handleMenuClose('right')"
            :icon="Download"
          >
            关闭右侧标签页
          </el-dropdown-item>
          <el-divider></el-divider>
          <el-dropdown-item
            :disabled="disabledOther"
            @click="handleMenuClose('other')"
            :icon="DocumentRemove"
          >
            关闭其他标签页
          </el-dropdown-item>
          <el-dropdown-item
            :disabled="disabledAll"
            @click="handleMenuClose('all')"
            :icon="DocumentDelete"
          >
            关闭所有标签页
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import {
  ArrowDown,
  Close,
  Download,
  DocumentRemove,
  DocumentDelete,
} from "@element-plus/icons-vue";
import { useTabsHook } from "./use-tabs-hook.js";
const {
  left,
  tabs,
  activeMenu,
  disabledCurrent,
  disabledLeft,
  disabledRight,
  disabledOther,
  disabledAll,
  tabsOut,
  tabsInner,
  handleScroll,
  handleTag,
  handleClose,
  handleMenuClose,
} = useTabsHook();
</script>

<style></style>
