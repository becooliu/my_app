
<template>
  <Title title="用户注册" class="margin-t-3"></Title>
  <el-container class="jf_c margin-t-2">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
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

      <el-form-item label="密码" prop="password2">
        <el-input
          type="password"
          v-model="ruleForm.password2"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import Title from "../../components/Title.vue";
import { ElMessage } from "element-plus";
import axios from "axios";

export default {
  name: "Regist",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };

    let checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      if (value.length < 6) {
        return callback(new Error("密码长度不能小于6位"));
      }
      callback();
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        password2: ""
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //简单的翻转帐号密码
          this.ruleForm.username = this.ruleForm.username
            .split("")
            .reverse()
            .join("");
          this.ruleForm.password = this.ruleForm.password
            .split("")
            .reverse()
            .join("");
          axios
            .post("/api/user/Register", this.ruleForm, {
              emulateJSON: true
            })
            .then(res => {
              let result = res.data;
              if (result.code === "200") {
                //注册成功
                ElMessage({
                  type: "success",
                  message: result.message
                });
                setTimeout(function() {
                  this.$route.push({ path: "Login" });
                }, 3000);
                return;
              }
              if (result.code === "5") {
                //帐号已存在
                ElMessage({
                  type: "error",
                  message: result.message
                });
              }
              if (result.code === "0") {
                //查询失败，可能是数据库连接失败
                ElMessage({
                  type: "error",
                  message: result.message
                });
              }

              console.log(res.data);
            });

          //alert("submit!");
        } else {
          ElMessage({
            type: "error",
            message: "提交的帐号或密码有误，请确认。"
          });
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {
    Title
  }
};
</script>
<style scoped>
.jf_c {
  justify-content: center;
  align-items: center;
}
</style>