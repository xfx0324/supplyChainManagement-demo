<template class="tem">
  <div class="div">
    <p class="p1">
      位置：采购管理
      <span>&gt;</span>供应商管理
      <span>&gt;</span>增加供应商
    </p>
    <el-form
      :model="addList"
      :rules="rules"
      ref="addList"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="供应商编号" prop="venderCode">
        <el-input v-model="addList.venderCode"></el-input>
      </el-form-item>
     <el-form-item label="供应商名称" prop="name">
        <el-input v-model="addList.name"></el-input>
      </el-form-item>
      <el-form-item label="供应商密码" prop="passWord">
        <el-input type="password" v-model="addList.passWord"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactor">
        <el-input v-model="addList.contactor"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="addList.address"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="postCode">
        <el-input v-model="addList.postCode"></el-input>
      </el-form-item>
      <el-form-item label="注册日期" prop="createDate">
        <el-input v-model="addList.createDate" readonly></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="addList.tel"></el-input>
      </el-form-item>
      <el-form-item label="传真" prop="fax">
        <el-input v-model="addList.fax"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitAdd('addList')" class="el-button">提交</el-button>
        <el-button @click="resetForm('addList')" class="el-button">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import { now } from "@/utils/date.js";
import { nowTime } from "@/utils/date.js";
const qs = require("querystring");
export default {
  data() {
    return{
      addList:{
        venderCode:nowTime(),
        name:'',
        passWord:'',
        contactor:'',
        address:'',
        postCode:'',
        createDate:now(),
        tel:'',
        tax:''
      },
      rules:{
        venderCode:[
          {
            type: "string",
            required: true,
            message: "请输入供应商编号",
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods:{
    submitAdd(list){
      this.$refs[list].validate(valid => {
        if (valid) {
          // 验证通过返回true
          // this.$Message.success("数据合法");
          axios
            .post("/api/main/purchase/vender/add", qs.stringify(this.addList))
            .then(response => {
              if (response.data.code == 2) {
                return this.$message({
              message: "添加成功",
              type: "success"
            });
              } else {
                return this.$message.error('添加失败');
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
.tem,.div {
  margin: 0;
}
.p1 {
  background-color: rgb(235, 230, 230);
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
.el-button{
  background-color: #da9595;
}
</style>