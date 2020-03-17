<template>
  <div>
    <div v-if="isShow">
      <p class="p1">
        位置：系统管理
        <span>&gt;</span>用户管理
      </p>
      <router-link to="/home/user/userAdd">
        <el-button icon="el-icon-plus" size="medium" class="el-button">增加</el-button>
      </router-link>
      <el-table :data="userList" stripe style="width:95%" class="el-table">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="account" label="用户账号" width="120"></el-table-column>
        <el-table-column prop="name" label="用户姓名" width="120"></el-table-column>
        <el-table-column prop="createDate" label="添加日期" width="180"></el-table-column>
        <el-table-column prop="status" label="锁定状态" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.status===0?'不锁定':'锁定'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="models" label="用户权限列表">
          <template slot-scope="scope">
            <span
              v-for="(item,index) in scope.row.models"
              :key="index"
              class="mode"
            >{{item.modelName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <router-link to="/home/user/userModification">
           <el-button size="mini">编辑</el-button>
            </router-link>-->
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="dele(scope.row.account)">删除</el-button>
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
        位置：系统管理
        <span>&gt;</span>用户管理
        <span>&gt;</span>修改用户信息
      </p>
      <el-form :model="editList" label-width="80px" class="form">
        <el-form-item label="用户账号" prop="account">
          <el-input class="input" v-model="editList.account" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input class="input" v-model="editList.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="passWord">
          <el-input class="input" v-model="editList.passWord"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input class="input" v-model="editList.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="锁定状态" prop="status">
          <el-radio-group v-model="editList.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限" prop="modelcodes">
          <el-checkbox-group v-model="editList.modelcodes">
            <el-checkbox :label="3" name="xt">系统管理</el-checkbox>
            <el-checkbox :label="1" name="cg">采购管理</el-checkbox>
            <el-checkbox :label="5" name="cc">仓储管理</el-checkbox>
            <el-checkbox :label="2" name="xs">销售管理</el-checkbox>
            <el-checkbox :label="6" name="yw">业务报表</el-checkbox>
            <el-checkbox :label="4" name="ws">网上销售</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="conEdit('editList')" class="el-button">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
export default {
  inject:['reload'],
  data() {
    return {
      isShow: true,
      userList: [],
      editList: {
        account: "",
        name: "",
        passWord: "",
        createDate: "",
        status:0,
        modelcodes: []
      },
      totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:0//当前页
    };
  },
  methods: {
    init() {
      axios.get("/api/main/system/user/show").then(response => {
        this.totalP=response.data.total
        this.pageS=response.data.pageSize
        this.userList = response.data.list;
      });
    },
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        axios.get("/api/main/system/user/show?page="+val).then(response => {
            this.userList = response.data.list
        })
      },
    edit(list) {
      this.isShow = false;
      Object.assign(this.editList,list)
      // this.editList = { ...list };
      this.editList.modelcodes =this.editList.models.map(item => item.modelCode);
      delete this.editList.models;
    },
    conEdit(list) {
      axios
        .post("/api/main/system/user/update", qs.stringify(this.editList))
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
    dele(acc) {
      axios
        .post("/api/main/system/user/delete?account=" + acc)
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
        // this.$router.go(0);
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
.mode {
  margin-right: 8px;
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
}
.el-button,
.el-table {
  margin-left: 18px;
}
.el-button {
  background-color: #da9595;
}
.from {
  padding-top: 18px;
}
</style>