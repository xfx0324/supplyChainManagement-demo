<template>
  <div>
    <p class="p1">
      位置：销售管理
      <span>&gt;</span>产品分类管理
    </p>
    <router-link to="/home/sell/proCatAdd">
      <el-button icon="el-icon-plus" size="medium" class="el-button">增加</el-button>
    </router-link>
    <el-table :data="proCatList" stripe style="width:95%" class="el-table">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="categoryId" label="产品类别编号"></el-table-column>
      <el-table-column prop="name" label="产品类别名称"></el-table-column>
      <el-table-column prop="remark" label="产品描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="dele(scope.row.categoryId)">删除</el-button>
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
    <!-- 编辑产品类别 -->
    <el-dialog title="修改产品类别" :visible.sync="dialogFormVisible">
      <el-form :model="modList">
        <el-form-item label="产品类别编号">
          <el-input v-model="modList.categoryId" autocomplete="off" readonly ></el-input>
        </el-form-item>
        <el-form-item label="产品类别名称">
          <el-input v-model="modList.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品类别描述">
          <el-input v-model="modList.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="conMod">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const qs = require("querystring");
export default {
  data() {
    return {
      proCatList: [],
      dialogFormVisible: false,
      modList: {
        categoryId: "",
        name: "",
        remark: ""
      },
      totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:0//当前页
    };
  },
  methods: {
    init() {
      this.$axios.get("/api/main/sell/category/show").then(response => {
        this.totalP=response.data.total
        this.pageS=response.data.pageSize
        this.proCatList = response.data.list;
      });
    },
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$axios.get("/api/main/sell/category/show?page="+val).then(response => {
            this.proCatList = response.data.list
        })
      },
    edit(row) {
      this.dialogFormVisible = true;
      Object.assign(this.modList, row);
    },
    conMod() {
      this.dialogFormVisible=false;
      this.$axios
        .post("/api/main/sell/category/update", qs.stringify(this.modList))
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
        .post("/api/main/sell/category/delete?categoryId="+id)
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