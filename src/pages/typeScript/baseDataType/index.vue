<template>
  <h3>TS的基本数据类型</h3>
  <ul>
    <li>基本类型：string、number、boolean、symbol、bigint、null、undefined</li>
    <li>引用类型：array、 Tuple(元组)、 object(包含Object和{})、function</li>
    <li>特殊类型：any、unknow、void、nerver、Enum(枚举)</li>
    <li>其他类型：类型推理、字面量类型、交叉类型</li>
  </ul>
</template>

<script setup lang="ts">
//字符串
let str: string = "Domesy";

// 数字
let num: number = 7;

//布尔
let bool: boolean = true;

//symbol
let sym: symbol = Symbol();

//bigint
let big: bigint = 10n;

//null
let nu: null = null;

//undefined
let un: undefined = undefined;

console.log(str, num, big, sym, bool, nu, un);
</script>

<style scoped lang="less"></style>
