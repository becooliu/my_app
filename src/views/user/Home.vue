
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-sub-menu index="2">
      <template #title>我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-sub-menu index="4" style="float: right">
      <template #title>我的</template>
      <el-menu-item index="4-1">帐号信息</el-menu-item>
      <el-menu-item index="4-2">修改密码</el-menu-item>
      <el-menu-item index="4-3" @click="logout()">登出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { ElMenu, ElMenuItem, ElSubMenu } from "element-plus";
import { setLogoutStorage, delCookie } from "../../../utils/index";

export default {
  name: "Home",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  components: { ElMenu, ElMenuItem, ElSubMenu },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      //登出
      setLogoutStorage("userCookie");
      delCookie("userCookie");
      this.$store.commit("setLogoutStatus");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style>
</style>
