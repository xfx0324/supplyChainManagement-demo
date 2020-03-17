<template>
  <div>
    <p class="p1">
      位置：销售管理
      <span>&gt;</span>产品分类管理
      <span>&lt;</span>增加产品分类
    </p>
    <h4>基本信息</h4>
    <el-form :model="addCat" label-width="100px" class="form">
      <el-form-item label="产品分类编号">
        <el-input class="input"  style="width:380px" readonly placeholder="无需填写"></el-input>
      </el-form-item>
      <el-form-item label="产品分类名称">
        <el-input class="input" v-model="addCat.name" style="width:380px"></el-input>
      </el-form-item>
      <el-form-item label="分类描述">
        <el-input class="input" v-model="addCat.remark" style="width:380px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitList" class="el-button">确定</el-button>
        <!-- <el-button @click="cancel" class="el-button">取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const qs = require("querystring");
import { nowTime } from "@/utils/date.js";
export default {
  data() {
    return {
      addCat: {
        name: "",
        remark: ""
      }
    };
  },
  methods: {
    submitList() {
      this.$axios
        .post("/api/main/sell/category/add", qs.stringify(this.addCat))
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
* {
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
h4,
.form {
  margin: 18px;
}
</style>