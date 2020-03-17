<template>
  <div>
    <p class="p1">
      位置：销售管理
      <span>&gt;</span>新添销售单
      <span>&gt;</span>增加销售单
    </p>
    <el-button icon="el-icon-plus" size="medium" class="el-button" @click="addDetail">增加明细</el-button>
    <el-button size="medium" class="el-button" @click="saveList">保存</el-button>
    <el-form :inline="true" :model="list" class="demo-form-inline" label-width="120px">
      <el-form-item label="销售单编号">
        <el-input v-model="list.soId" readonly></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="list.createTime" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户编号">
        <el-select v-model="list.customerCode">
          <el-option
            v-for="item in cusList"
            :key="item.customerCode"
            :value="item.customerCode"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建用户">
        <el-input v-model="list.account" readonly></el-input>
      </el-form-item>
      <el-form-item label="附加费用">
        <el-input v-model="list.tipFee" @change="addPrice(list)"></el-input>
      </el-form-item>
      <el-form-item label="付款方式">
        <el-select v-model="list.payType">
          <el-option label="货到付款" :value="1"></el-option>
          <el-option label="款到发货" :value="2"></el-option>
          <el-option label="预付款到发货" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售单总价">
        <el-input v-model="list.soTotal" readonly ></el-input>
      </el-form-item>
      <el-form-item label="产品总价">
        <el-input v-model="list.productTotal" @change="addPrice(list)" readonly ></el-input>
      </el-form-item>
      <el-form-item label="销售单状态">
        <el-select v-model="list.status">
          <el-option label="新增" :value="1"></el-option>
          <!-- <el-option label="已发货" :value="2"></el-option>
          <el-option label="已付款" :value="3"></el-option>
          <el-option label="已了结" :value="4"></el-option>
          <el-option label="已预付" :value="5"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="最低预付款金额">
        <el-input v-model="list.prePayFee" :disabled="list.payType==3?false:true"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="list.remark"></el-input>
      </el-form-item>
    </el-form>
    <table class="table1">
      <tr>
        <td>序号</td>
        <td>产品编号</td>
        <td>产品名称</td>
        <td>数量单位</td>
        <td>产品数量</td>
        <td>产品单价</td>
        <td>产品总价</td>
        <td>操作</td>
      </tr>
      <tr v-for="(item,index1) in list.soitems" :key="index1">
        <td>{{index1+1}}</td>
        <td>
          <input type="text" v-model="item.productCode" />
          <el-button icon="el-icon-edit-outline" circle @click="productList(index1)"></el-button>
        </td>
        <td>
          <input type="text" v-model="item.name" />
        </td>
        <td>
          <input type="text" v-model="item.unitName" />
        </td>
        <td>
          <input type="text" v-model="item.num" @change="totelP(item,list)"/>
        </td>
        <td>
          <input type="text" v-model="item.unitPrice" @change="totelP(item,list)" readonly/>
        </td>
        <td>
          <!-- {{item.num*item.unitPrice}} -->
          <input type="text" :value="item.itemPrice" />
        </td>
        <td>
          <el-button icon="el-icon-delete" circle @click="del(index1,list)"></el-button>
        </td>
      </tr>
    </table>
    <!-- 产品列表 -->
    <el-dialog title="产品列表" :visible.sync="dialogTableVisible">
      <el-table :data="products">
        <el-table-column label="选择" width="150">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="productCode" label="产品编号" width="150"></el-table-column>
        <el-table-column property="name" label="产品名称" width="200"></el-table-column>
        <el-table-column property="unitName" label="数量单位"></el-table-column>
        <el-table-column property="price" label="销售价格"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmL">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { nowTime } from "@/utils/date.js";
import { now } from "@/utils/date.js";
import axios from "axios";
export default {
  data() {
    return {
      list: {
        soId: nowTime(),
        customerCode: "",
        account: this.$store.state.loginUser,
        createTime: now(),
        tipFee: 0,
        productTotal: 0,
        soTotal: 0,
        payType: 1,
        prePayFee: 0,
        status: 1,
        remark: "",
        soitems: []
      },
      cusList: [],
      dialogTableVisible: false,
      index: 0,
      radio: "",
      products: []
    };
  },
  methods: {
    // 增加产品明细
    addDetail() {
      this.list.soitems.push({
        productCode: "",
        unitPrice: 0,
        num: 0,
        unitName: "",
        itemPrice:0
      });
    },
    // 客户编号列表
    cuList() {
      axios.get("/api/main/sell/customer/show").then(response => {
        this.cusList = response.data.list;
      });
    },
    //产品列表
    productList(index2) {
      this.index = index2;
      this.dialogTableVisible = true;
      axios.get("/api/main/sell/product/all").then(response => {
        this.products = response.data;
      });
    },
    //产品列表中点击确定添加到产品明细
    confirmL() {
      let a=false
      let index=0
      this.dialogTableVisible = false;
      for(let i=0;i<this.list.soitems.length;i++){
        if(this.products[this.radio].productCode==this.list.soitems[i].productCode){
          a=true;
          index=i
        }
      }
      if(a){
         alert("该产品已在列表中的第"+(index+1)+"行，可直接增加数量")
      }
      else{
      this.list.soitems[this.index].productCode = this.products[this.radio].productCode;
      this.list.soitems[this.index].name = this.products[this.radio].name;
      this.list.soitems[this.index].unitName = this.products[this.radio].unitName;
      this.list.soitems[this.index].unitPrice = this.products[this.radio].price;
      }
      
    },
    //单行总价和销售产品总价
    totelP(item,list1) {
      item.itemPrice = item.unitPrice * item.num;
      let total = 0;
      for(let i=0;i<list1.soitems.length;i++){
        total+=list1.soitems[i].itemPrice
      }
      list1.productTotal=total
      this.addPrice(list1)
    },
    //销售总价
    addPrice(list1){
      list1.soTotal=Number(list1.productTotal)+Number(list1.tipFee)
    },
    //删除一条明细表
    del(index2,list1){
        this.list.soitems.splice(index2,1)
         let total = 0;
      for(let i=0;i<list1.soitems.length;i++){
        total+=list1.soitems[i].itemPrice
      }
      list1.productTotal=total
      this.addPrice(list1)
    },
    //保存提交数据
    saveList() {
      axios({
        url: "/api/main/sell/somain/add",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: this.list
      }).then(response => {
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
    this.cuList();
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
  background-color: #da9595;
  margin: 18px 0 18px 18px;
}
.el-table {
  margin-left: 18px;
}
.table1{
  color: rgb(75, 73, 73);
  font-size: 14px;
  margin-top:20px;
  margin-left:18px;
  text-align: center;
  width: 1000px;
}
.table1 tr{
  height: 60px;
}
.table1 td input{
  height:30px;
}
</style>