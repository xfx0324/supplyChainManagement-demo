<template>
  <div>
    <p class="p1">
      位置：销售管理
      <span>&gt;</span>客户管理
      <span>&lt;</span>增加客户
    </p>
    <h4>基本信息</h4>
    <el-form :model="addCon" label-width="80px" class="form">
      <el-form-item label="客户编号">
        <el-input class="input" v-model="addCon.customerCode"></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input class="input" v-model="addCon.name"></el-input>
      </el-form-item>
      <el-form-item label="客户密码">
        <el-input type="passWord" class="input" v-model="addCon.passWord"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input class="input" v-model="addCon.contactor"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input class="input" v-model="addCon.address"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码">
        <el-input class="input" v-model="addCon.postCode"></el-input>
      </el-form-item>
      <el-form-item label="注册日期">
        <el-input class="input" v-model="addCon.createDate" readonly ></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input class="input" v-model="addCon.tel"></el-input>
      </el-form-item>
      <el-form-item label="传真">
        <el-input class="input" v-model="addCon.fax"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitAdd" class="el-button">添加</el-button>
        <!-- <el-button @click="resetForm" class="el-button">取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const qs = require("querystring");
import { now } from "@/utils/date.js";
import { nowTime } from "@/utils/date.js";
export default {
  data() {
    return {
      addCon: {
        customerCode:nowTime().slice(4,14),
        name: "",
        password: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: now().slice(0,10),
        tel: "",
        fax: ""
      }
    };
  },
  methods:{
      submitAdd(){
          this.$axios
        .post("/api/main/sell/customer/add", qs.stringify(this.addCon))
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
      }
  }
};
</script>
<style scoped>
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
.el-button {
  margin-top: 15px;
  margin-bottom: 15px;
}
.el-button,
.el-table {
  margin-left: 18px;
}
.el-button {
  background-color: #da9595;
}
</style>
