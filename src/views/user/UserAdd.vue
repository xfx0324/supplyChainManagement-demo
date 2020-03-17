<template>
  <div>
    <p class="p1">
      位置：系统管理
      <span>&gt;</span>用户管理
      <span>&gt;</span>添加新用户
    </p>
    <h4>基本信息</h4>
    <el-form :model="register" label-width="80px" class="form" :rules="userRules" ref="register">
      <el-form-item label="用户账号" prop="account">
        <el-input class="input" v-model="register.account"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop="name">
        <el-input class="input" v-model="register.name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="passWord">
        <el-input class="input" v-model="register.passWord" type="password"></el-input>
      </el-form-item>
      <el-form-item label="添加日期" prop="createDate">
        <el-input class="input" v-model="register.createDate" readonly></el-input>
      </el-form-item>
      <el-form-item label="锁定状态" prop="status">
        <el-radio-group v-model="register.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限" prop="modelcodes">
        <el-checkbox-group v-model="register.modelcodes">
          <el-checkbox :label="3" name="xt">系统管理</el-checkbox>
          <el-checkbox :label="1" name="cg">采购管理</el-checkbox>
          <el-checkbox :label="5" name="cc">仓储管理</el-checkbox>
          <el-checkbox :label="2" name="xs">销售管理</el-checkbox>
          <el-checkbox :label="6" name="yw">业务报表</el-checkbox>
          <el-checkbox :label="4" name="ws">财务管理</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitRegister('register')" class="el-button">注册</el-button>
        <el-button @click="resetForm('register')" class="el-button">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import { now } from "@/utils/date.js";
const qs = require("querystring");
export default {
  data() {
    return {
      register: {
        account: "",
        name: "",
        passWord: "",
        createDate: now(),
        status:0,
        modelcodes: []
      },
      userRules: {
        account: [
          {
            type: "string",
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        name:[
          {
            type: "string",
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            type: "string",
            min: 1,
            max: 30,
            message: "密码长度为1~30位",
            trigger: "blur"
          }
          
        ],
        modelcodes:{
          type: 'array', 
          required: true, 
          message: '请至少选择一种权限', 
          trigger: 'change' 
        }
      },
    };
  },
  methods: {
    submitRegister(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 验证通过返回true
          // this.$Message.success("数据合法");
          axios
            .post("/api/main/system/user/add", qs.stringify(this.register))
            .then(response => {
              if (response.data.code == 2) {
                return this.$message({
              message: "注册成功",
              type: "success"
            });
              } else {
                return this.$message.error('注册失败');
              }
            });
        } else {
          // 没有通过验证
          this.$Message.error("数据不合法");
        }
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>
<style scoped>
/* * {
  margin: 0;
} */
.p1 {
  background-color:rgb(235, 230, 230);
  height: 25px;
  padding: 18px 18px;
  color: rgb(61, 60, 60);
  border-bottom: 1px solid rgb(196, 117, 117);
}
.p1 span {
  margin-left: 4px;
  margin-right: 4px;
  color: rgb(138, 135, 135);
}
h4,
.form {
  margin: 18px;
}
.el-button{
  background-color: #da9595;
}
</style>