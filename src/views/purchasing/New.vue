<template>
  <div>
    <div>
      <p class="p1">
        位置：采购管理
        <span>&gt;</span>新添采购单
      </p>
      <router-link to="/home/purchasing/add">
        <el-button icon="el-icon-plus" size="medium" class="el-button" id="button">增加</el-button>
      </router-link>
      <el-table :data="purchaseNew" stripe style="width:95%" class="el-table">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="poId" label="采购单编号" width="130"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>
        <el-table-column prop="venderName" label="供应商名称" width="110"></el-table-column>
        <el-table-column prop="account" label="创建用户" width="80"></el-table-column>
        <el-table-column prop="tipFee" label="附加费用" width="80"></el-table-column>
        <el-table-column prop="productTotal" label="产品总价" width="80"></el-table-column>
        <el-table-column prop="poTotal" label="订单总价" width="80"></el-table-column>
        <el-table-column prop="payType" label="付款方式" width="80"></el-table-column>
        <el-table-column prop="prePayFee" label="最低预付款" width="90"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="dele(scope.row.poId)">删除</el-button>
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
    <!-- 编辑对话框 -->
    <el-dialog title="采购单明细" :visible.sync="dialog" width="80%">
      <el-button icon="el-icon-plus" size="medium" class="el-button" @click="addDetail" id="button">增加明细</el-button>
      <el-form :model="list" :inline="true" label-width="120px">
        <el-form-item label="采购单编号">
          <el-input v-model="list.poId" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="list.createTime" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="list.venderCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-edit-outline" circle @click="suList"></el-button>
        </el-form-item>
        <el-form-item label="创建用户">
          <el-input v-model="list.account" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="附加费用">
          <el-input v-model="list.tipFee" autocomplete="off" @change="addPrice(list)"></el-input>
        </el-form-item>
        <el-form-item label="付款方式">
          <el-select v-model="list.payType">
            <el-option label="货到付款" :value="1"></el-option>
            <el-option label="款到发货" :value="2"></el-option>
            <el-option label="预付款到发货" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购总价">
          <el-input v-model="list.poTotal" autocomplete="off" readonly ></el-input>
        </el-form-item>
        <el-form-item label="采购产品总价">
          <el-input v-model="list.productTotal" autocomplete="off" readonly @change="addPrice(list)"></el-input>
        </el-form-item>
        <el-form-item label="采购单状态">
          <el-select v-model="list.status">
            <el-option label="新增" :value="1"></el-option>
            <el-option label="已收货" :value="2"></el-option>
            <el-option label="已付款" :value="3"></el-option>
            <el-option label="已了结" :value="4"></el-option>
            <el-option label="已预付" :value="5"></el-option>
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
        <tr v-for="(item,index1) in list.poitems" :key="index1">
          <td>{{index1+1}}</td>
          <td>
            <input type="text" v-model="item.productCode" />
            <el-button icon="el-icon-edit-outline" circle @click="productList(index1)"></el-button>
          </td>
          <td>
            <input type="text" v-model="item.productName" />
          </td>
          <td>
            <input type="text" v-model="item.unitName" />
          </td>
          <td>
            <input type="text" v-model="item.num" @change="totelP(item,list)"/>
          </td>
          <td>
            <input type="text" v-model="item.unitPrice" @change="totelP(item,list)"/>
          </td>
          <td>
            <input type="text" :value="item.itemPrice" readonly/>
          </td>
          <td>
            <el-button icon="el-icon-delete" circle @click="del(index1,list)"></el-button>
          </td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveList">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 产品列表 -->
    <el-dialog title="产品列表" :visible.sync="dialogTableVisible">
      <el-table :data="products">
        <el-table-column label="选择" width="150">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="productCode" label="产品编号" width="150"></el-table-column>
        <el-table-column property="unitName" label="产品名称" width="200"></el-table-column>
        <el-table-column property="name" label="数量单位"></el-table-column>
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
import axios from "axios";
export default {
  data() {
    return {
      purchaseNew: [],
      dialogTableVisible: false,
      dialogTable:false,
      dialog: false,
      list: {
        poId: "",
        venderCode: "",
        account: "",
        createTime: "",
        tipFee: 0,
        productTotal: 0,
        poTotal: 0,
        payType: 0,
        prePayFee: 0,
        status: 1,
        remark: "",
        poitems: []
      },
      products: [],
      radio: "",
      suppliers:[],
      index: 0,
      totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:0//当前页
    };
  },
  methods: {
    init() {
      this.$axios
        .get("/api/main/purchase/pomain/show?type=1")
        .then(response => {
          this.totalP=response.data.total
        this.pageS=response.data.pageSize
          this.purchaseNew = response.data.list;
        });
    },
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        axios.get("/api/main/purchase/pomain/show?type=1&page="+val).then(response => {
            this.purchaseNew = response.data.list
        })
      },
    //点击修改订单信息
    edit(row) {
      this.dialog = true;
      this.$axios
        .get("/api/main/purchase/pomain/queryItem?poId=" + row.poId)
        .then(response => {
          this.list.poitems = response.data;
        });
      this.list = row;
      
    },
    // 增加产品明细
    addDetail() {
      this.list.poitems.push({
        productCode: "",
        productName: "",
        unitPrice: 0,
        num: 1,
        unitName: "",
        itemPrice: 0
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
    confirmS() {
      this.dialogTable = false;
      this.list.venderCode = this.suppliers[this.radio].venderCode;
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
    del(index2,list1) {
      this.list.poitems.splice(index2, 1);
       let total = 0;
      for(let i=0;i<list1.poitems.length;i++){
        total+=list1.poitems[i].itemPrice
      }
      list1.productTotal=total
      this.addPrice(list1)
    },
    //保存提交数据
    saveList() {
      this.dialog=false
      axios({
        url: "/api/main/purchase/pomain/update",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: this.list
      }).then(response => {
          if (response.data.code == 2) {
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
      axios.post("/api/main/purchase/pomain/delete?poId="+id).then(response => {
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
.el-button {
  background-color: #da9595;
}
.el-table {
  margin-left: 18px;
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