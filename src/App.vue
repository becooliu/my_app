<template>
  <div id="main">
    <el-container>
      <el-aside v-if="this.$store.state.isLogin">
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-container>
          <el-row style="width: 100%" v-if="this.$store.state.isLogin">
            <!-- <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                当前位置:{{ routerName }}
              </div>
            </el-col> -->
            <el-col :span="24">
              <div class="user-login">
                <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
                <div style="text-align: right">{{ username }}</div>
              </div>
            </el-col>
          </el-row>
        </el-container>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
  <!-- <div id="nav">
    <router-view></router-view>
  </div> -->
</template>
<script>
import { defineComponent } from "vue";
import {
  ElContainer,
  ElAside,
  ElMain,
  ElRow,
  ElCol,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElAvatar
} from "element-plus";
import { getCookie } from "../utils";

export default defineComponent({
  name: "app",
  data() {
    return {
      username: getCookie("userCookie"),
      routerName: "首页"
    };
  },
  components: {
    ElContainer,
    ElAside,
    ElMain,
    ElRow,
    ElCol,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElAvatar
  }
});
</script>

<style scoped>
.user-login {
  display: flex;
  align-items: flex-end;
  justify-content: right;
}
</style>