<template>
  <Title title="用户登录" class="margin-t-3"></Title>
  <el-container class="jf_c margin-t-2">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="user_form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-link type="default" :href="`/#/register`"
          >没有帐号？立即注册</el-link
        >
        <el-link type="default" :href="`/#/reset`" style="margin-left: 2em"
          >忘记密码？</el-link
        >
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import Title from "../../components/Title.vue";
import axios from "axios";
import { ElMessage, ElLink } from "element-plus";
import { setCookie, setLoginStorage, md5Pass } from "../../../utils/index";

export default {
  name: "Regist",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      if (value.length < 5) {
        return callback(new Error("用户名长度不能小于5位"));
      }
      callback();
    };

    let checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      if (value.length < 6) {
        if (this.ruleForm.username !== "admin") {
          return callback(new Error("密码长度不能小于6位"));
        }
      }
      callback();
    };

    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.password = md5Pass(this.ruleForm.password);
          axios
            .post("/api/Admin/Login", this.ruleForm, {
              emulateJSON: true,
            })
            .then((res) => {
              if (res.data.code == "200") {
                ElMessage({
                  type: "success",
                  message: res.data.message,
                });
                setLoginStorage("userCookie", this.ruleForm.username); //localStorage 存储登录信息
                setCookie("userCookie", this.ruleForm.username, 1);
                this.$store.commit("setLoginStatus", true);
                setTimeout(() => {
                  this.$router.push({ name: "Home" });
                }, 3000);
              } else {
                ElMessage({
                  type: "error",
                  message: res.data.message,
                });
                return;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  components: {
    Title,
    ElLink,
  },
};
</script>
<style scoped>
.jf_c {
  justify-content: center;
  align-items: center;
}
</style>
