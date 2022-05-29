<template>
  <div id="main">
    <el-container>
      <el-aside v-if="getIsLogin">
        <el-menu router :default-openeds="['1']">
          <el-sub-menu index="1">
            <template #title><i class="el-icon-message"></i>房间</template>
            <el-menu-item-group>
              <el-menu-item index="/user/home">房间总览</el-menu-item>
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
            <template #title
              ><el-icon class="menu-item-icon"><user /></el-icon>我的</template
            >

            <el-menu-item-group>
              <el-menu-item index="3-1">帐号信息</el-menu-item>
              <el-menu-item index="/reset">修改密码</el-menu-item>
              <el-menu-item index="3-3" @click="logout()"
                >退出登录</el-menu-item
              >
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
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import {
  ElContainer,
  ElAside,
  ElMain,
  //ElRow,
  //ElCol,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  //ElAvatar,
} from "element-plus";
//引入element-ui svg 图标
//import { User } from "@element-plus/icons";
import { getCookie, setLogoutStorage, delCookie } from "../utils";

export default defineComponent({
  name: "app",
  data() {
    return {
      isLogin: false,
      username: getCookie("userCookie"),
      routerName: "首页",
    };
  },
  computed: {
    getIsLogin() {
      //return this.$store.isLogin;
      return getCookie("userCookie");
      //return localStorage.getItem("userCookie");
      //this.$store.commit("setLoginStatus", localStorage.getItem("userCookie"));
    },
  },
  components: {
    ElContainer,
    ElAside,
    ElMain,
    //ElRow,
    //ElCol,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElMenuItemGroup,
    //ElAvatar,
    //User,
  },
  methods: {
    logout() {
      //登出
      setLogoutStorage("userCookie");
      delCookie("userCookie");
      this.$store.commit("setLogoutStatus");
      this.$router.push({ name: "Login" });
    },
  },
});
</script>

<style>
.menu-item-icon {
  display: inline-block;
  font-size: 1em;
  width: 24px;
  margin-right: 5px;
  line-height: 0px;
  overflow: hidden;
}
.user-login {
  display: flex;
  align-items: flex-end;
  justify-content: right;
}
.user_form {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1.5rem;
  background: #fafafa;
}
</style>
