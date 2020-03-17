<template>
    <div>
        <p class="p1">
      位置：销售管理
      <span>&gt;</span>产品管理
      <span>&lt;</span>增加产品
    </p>
    <h4>基本信息</h4>
    <el-form :model="addPro" label-width="100px" class="form">
      <el-form-item label="产品编号">
        <el-input class="input" v-model="addPro.productCode" style="width:380px" readonly></el-input>
      </el-form-item>
      <el-form-item label="产品名称">
        <el-input class="input" v-model="addPro.name" style="width:380px"></el-input>
      </el-form-item>
      <el-form-item label="数量单位">
        <el-input class="input" v-model="addPro.unitName" style="width:380px"></el-input>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-select v-model="addPro.categoryId">
            <el-option v-for="item in addPro.proCatList" :key="item.categoryId" :value="item.categoryId" >{{item.name}}</el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="添加日期">
        <el-input class="input" v-model="addPro.createDate" style="width:380px" readonly ></el-input>
      </el-form-item>
      <el-form-item label="销售价">
        <el-input class="input" v-model="addPro.price" style="width:380px"></el-input>
      </el-form-item>
      <el-form-item label="产品描述">
        <el-input class="input" v-model="addPro.remark" style="width:380px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitAddPro" class="el-button">确定</el-button>
        <!-- <el-button @click="cancel" class="el-button">取消</el-button> -->
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
      addPro: {
        productCode:nowTime().slice(4,14),
        name:'',
        unitName:'',
        proCatList:[],
        categoryId:'',
        price:0,
        createDate:now(),
        remark:''
      }
    };
  },
  methods: {
      init(){
          this.$axios.get("/api/main/sell/category/all").then(response => {
        this.addPro.proCatList = response.data;
      });
      },
    submitAddPro() {
      this.$axios
        .post("/api/main/sell/product/add", qs.stringify(this.addPro))
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
  },
  beforeMount() {
    this.init();
  }
};
</script>
<style scoped>
* {
  margin: 0;
}
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
</style>