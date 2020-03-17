<template>
  <div >
      <div v-if="isShow">
    <p class="p1">
      位置：销售管理
      <span>&gt;</span>客户管理
    </p>
    <router-link to="/home/sell/customerAdd">
      <el-button icon="el-icon-plus" size="medium" class="el-button">增加</el-button>
    </router-link>
    <el-table :data="cusList" stripe style="width:95%" class="el-table">
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="customerCode" label="客户编号" width="80"></el-table-column>
      <el-table-column prop="name" label="客户名称" width="120"></el-table-column>
      <el-table-column prop="contactor" label="联系人" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="120"></el-table-column>
      <el-table-column prop="postCode" label="邮政编码" width="100"></el-table-column>
      <el-table-column prop="createDate" label="注册日期" width="150"></el-table-column>
      <el-table-column prop="tel" label="电话" width="100"></el-table-column>
      <el-table-column prop="fax" label="传真" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="dele(scope.row.customerCode)">删除</el-button>
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
        位置：销售管理
        <span>&gt;</span>客户管理
        <span>&gt;</span>修改客户信息
      </p>
      <el-form :model="addCon" label-width="80px" class="form">
      <el-form-item label="客户编号">
        <el-input class="input" v-model="addCon.customerCode" readonly ></el-input>
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
        <el-button @click="submitEdit" class="el-button">确认修改</el-button>
        <!-- <el-button @click="resetForm" class="el-button">取消</el-button> -->
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
const qs = require("querystring");
export default {
  data() {
    return {
      isShow: true,
      cusList: [],
      addCon: {
        customerCode:'',
        name: "",
        password: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: '',
        tel: "",
        fax: ""
      },
      totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:1//当前页
    };
  },
  methods: {
    init() {
      this.$axios.get("/api/main/sell/customer/show").then(response => {
        this.totalP=response.data.total
        this.pageS=response.data.pageSize
        this.cusList = response.data.list;
      });
    },
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$axios.get("/api/main/sell/customer/show?page="+val).then(response => {
            this.cusList = response.data.list
        })
      },
    edit(row){
        this.isShow = false;
      Object.assign(this.addCon,row)
    },
    submitEdit(){
        this.$axios
        .post("/api/main/sell/customer/update", qs.stringify(this.addCon))
        .then(response => {
          if (response.data.code == 2) {
            this.isShow=true;
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
        .post("/api/main/sell/customer/delete?customerCode="+id)
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