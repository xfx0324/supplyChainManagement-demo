<template>
  <div>
    <div v-if="isShow">
      <p class="p1">
        位置：采购管理
        <span>&gt;</span>供应商管理
      </p>
      <router-link to="/home/purchasing/addSupplier">
        <el-button icon="el-icon-plus" size="medium" class="el-button">增加</el-button>
      </router-link>
      <el-table :data="supplierList" stripe style="width:95%" class="el-table">
        <el-table-column prop="venderCode" label="供应商编号" width="90"></el-table-column>
        <el-table-column prop="name" label="供应商名称" width="90"></el-table-column>
        <el-table-column prop="contactor" label="联系人" width="90"></el-table-column>
        <el-table-column prop="address" label="地址" width="110"></el-table-column>
        <el-table-column prop="postCode" label="邮政编码" width="90"></el-table-column>
        <el-table-column prop="createDate" label="注册日期" width="140"></el-table-column>
        <el-table-column prop="tel" label="电话" width="120"></el-table-column>
        <el-table-column prop="fax" label="传真" width="120"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="dele(scope.row.venderCode)">删除</el-button>
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
    </div>
    <div v-if="!isShow">
      <p class="p1">
        位置：采购管理
        <span>&gt;</span>供应商管理
        <span>&gt;</span>修改供应商信息
      </p>
      <el-form
        :model="addList"
        ref="addList"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="供应商编号" prop="venderCode">
          <el-input v-model="addList.venderCode" readonly></el-input>
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
          <el-button @click="conEdit('addList')" class="el-button">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      isShow: true,
      supplierList: [],
      addList: {
        venderCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: "",
        tel: "",
        tax: ""
      },
       totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:0//当前页
    };
  },
  methods: {
    init() {
      axios.get("/api/main/purchase/vender/show").then(response => {
        this.totalP=response.data.total
        this.pageS=response.data.pageSize
        this.supplierList = response.data.list;
      });
    },
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        axios.get("/api/main/purchase/vender/show?page="+val).then(response => {
            this.supplierList = response.data.list
        })
      },
    edit(list) {
      this.isShow = false;
      Object.assign(this.addList, list);
    },
    conEdit(list) {
      axios
        .post("/api/main/purchase/vender/update", qs.stringify(this.addList))
        .then(response => {
          if (response.data.code == 2) {
            this.isShow=true
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
    dele(id) {
      axios
        .post("/api/main/purchase/vender/delete?venderCode=" + id)
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
<style  scoped>
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
.el-button,
.el-table {
  margin-left: 18px;
  margin-top: 18px;
}
.el-button {
  background-color: #da9595;
}
</style>