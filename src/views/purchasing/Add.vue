<template>
  <div>
    <p class="p1">
      位置：采购管理
      <span>&gt;</span>新添采购单
      <span>&gt;</span>增加采购单
    </p>
    <el-button icon="el-icon-plus" size="medium" class="el-button" @click="addDetail" id="button">增加明细</el-button>
    <el-button size="medium" class="el-button" @click="saveList" id="button">保存</el-button>
    <el-form :inline="true" :model="list" label-width="120px" class="demo-form-inline" >
      <el-form-item label="采购单编号">
        <el-input v-model="list.poId" readonly></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="list.createTime" readonly></el-input>
      </el-form-item>
      <el-form-item label="供应商">
        <el-input v-model="list.venderCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-edit-outline" circle @click="suList"></el-button>
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
      <el-form-item label="采购总价">
        <el-input :value="list.poTotal" readonly></el-input>
      </el-form-item>
      <el-form-item label="采购产品总价">
        <el-input v-model="list.productTotal" readonly @change="addPrice(list)"></el-input>
      </el-form-item>
      <el-form-item label="采购单状态">
        <el-select v-model="list.status">
          <el-option label="新增" :value="1"></el-option>
          <!-- <el-option label="已收货" :value="2"></el-option>
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
    <!-- 添加产品明细 -->
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
      <tr v-for="(item,index1) in list.poitems" :key="index1">
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
          <input type="text" v-model="item.num" @change="totelP(item,list)" />
        </td>
        <td>
          <input type="text" v-model="item.unitPrice" @change="totelP(item,list)" />
        </td>
        <td>
          <!-- {{item.num*item.unitPrice}} -->
          <input type="text" :value="item.itemPrice" readonly/>
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
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmL">确 定</el-button>
      </div>
      </el-dialog>
      <!-- 供应商列表 -->
    <el-dialog title="供应商列表" :visible.sync="dialogTable">
      <el-table :data="suppliers">
        <el-table-column label="选择" width="150">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="venderCode" label="供应商编号" width="150"></el-table-column>
        <el-table-column property="name" label="供应商名称"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTable = false">取 消</el-button>
        <el-button type="primary" @click="confirmS">确 定</el-button>
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
        poId: nowTime(),
        venderCode: "",
        account: this.$store.state.loginUser,
        createTime: now(),
        tipFee: 0,
        productTotal: 0,
        poTotal: 0,
        payType: 1,
        prePayFee: 0,
        status: 1,
        remark: "",
        poitems: []
      },
      dialogTableVisible: false,
      dialogTable:false,
      products: [],
      radio: "",
      index: 0,
      suppliers:[],
      dis:true
    };
  },
  methods: {
    // 增加产品明细
    addDetail() {
      this.list.poitems.push({
        productCode: "",
        name: "",
        unitPrice: 0,
        num: 1,
        unitName: "",
        itemPrice:0
      });
    },
    //获取供应商列表
    suList() {
      this.dialogTable = true;
      axios.get("/api/main/purchase/vender/all").then(response => {
        this.suppliers = response.data;
      });
    },
    //提交供应商编号
    confirmS(){
        this.dialogTable = false;
this.list.venderCode=this.suppliers[this.radio].venderCode
    },
    //获取产品列表
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
      // let index=this.list.poitems.indexOf()
      for(let i=0;i<this.list.poitems.length;i++){
        if(this.products[this.radio].productCode==this.list.poitems[i].productCode){
          a=true
          index=i
        }
      }
      if(a){
        alert("该产品已在列表中的第"+(index+1)+"行，可直接增加数量")
      }else{
      this.list.poitems[this.index].productCode = this.products[this.radio].productCode;
      this.list.poitems[this.index].name = this.products[this.radio].name;
      this.list.poitems[this.index].unitName = this.products[this.radio].unitName;
      }
       
    },
    //单行总价和采购产品总价
    totelP(item,list1) {
      item.itemPrice = item.unitPrice * item.num;
      let total = 0;
      for(let i=0;i<list1.poitems.length;i++){
        total+=list1.poitems[i].itemPrice
      }
      list1.productTotal=total
      this.addPrice(list1)
    },
    //采购总价
    addPrice(list1){
      list1.poTotal=Number(list1.productTotal)+Number(list1.tipFee)
    },
    //删除一条明细表
    del(index2,list1){
        this.list.poitems.splice(index2,1)
        let total = 0;
      for(let i=0;i<list1.poitems.length;i++){
        total+=list1.poitems[i].itemPrice
      }
      list1.productTotal=total
      this.addPrice(list1)
    },
    //保存提交数据
    saveList() {
        axios({
    url: '/api/main/purchase/pomain/add',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
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
}
#button{
margin: 18px 0 18px 18px;
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
