<template>
    <div>
        <p class="p1">
      位置：销售管理
      <span>&gt;</span>产品管理
    </p>
    <router-link to="/home/sell/proAdd">
      <el-button icon="el-icon-plus" size="medium" class="el-button">增加</el-button>
    </router-link>
    <el-table :data="proList" stripe style="width:95%" class="el-table">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="productCode" label="产品编号" width="110px"></el-table-column>
      <el-table-column prop="name" label="产品名称" width="110px"></el-table-column>
      <el-table-column prop="unitName" label="数量单位" width="110px"></el-table-column>
      <el-table-column prop="categoryName" label="分类名称" width="110px"></el-table-column>
      <el-table-column prop="createDate" label="添加日期" width="110px"></el-table-column>
      <el-table-column prop="price" label="销售价" width="110px"></el-table-column>
      <el-table-column prop="remark" label="产品描述" width="110px"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="dele(scope.row.productCode)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10,20]"
      :page-size="pageS"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalP">
    </el-pagination>
    <!-- 编辑显示对话框 -->
    <el-dialog title="修改产品信息" :visible.sync="dialogFormVisible">
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
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="conEdit">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
const qs = require("querystring");
export default {
    data(){
      return{
        proList:[],
        dialogFormVisible: false,
        addPro:{
          productCode:'',
        name:'',
        unitName:'',
        proCatList:[],
        categoryId:'',
        price:0,
        createDate:'',
        remark:''
        },
         totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:0//当前页
      }
    },
    methods:{
      init() {
      this.$axios.get("/api/main/sell/product/show").then(response => {
        this.totalP=response.data.total
        this.pageS=response.data.pageSize
        this.proList = response.data.list;
      });
    },
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$axios.get("/api/main/sell/product/show?page="+val).then(response => {
            this.proList = response.data.list
        })
      },
    edit(row){
      this.dialogFormVisible=true,
      Object.assign(this.addPro, row);
      this.$axios.get("/api/main/sell/category/all").then(response => {
        this.addPro.proCatList = response.data;
      });
    },
    conEdit(){
      this.dialogFormVisible=false;
      this.$axios
        .post("/api/main/sell/product/update", qs.stringify(this.addPro))
        .then(response => {
          if (response.data.code == 2) {
            this.init()
            return this.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            return this.$message.error('修改失败');
          }
        });
    },
    dele(id){
      this.$axios
        .post("/api/main/sell/product/delete?productCode="+id)
        .then(response => {
          if (response.data.code == 2) {
            this.init()
            return this.$message({
              message: "删除成功",
              type: "success"
            });
          } else {
            return this.$message.error('删除失败');
          }
        });
    }
    },
    beforeMount() {
    this.init();
  }
}
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
.el-button {
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #da9595;
}
.el-button,
.el-table {
  margin-left: 18px;
}
</style>