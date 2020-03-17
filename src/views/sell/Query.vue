<template>
    <div>
         <p class="p1">
      位置：销售管理
      <span>&gt;</span>销售单查询
    </p>
    <div class="div1">
      <el-form :inline="true" :model="checkData" label-width="120px" class="demo-form-inline">
        <el-form-item label="销售单编号">
          <el-input v-model="checkData.soId"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-input v-model="checkData.startDate"></el-input>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-input v-model="checkData.endDate"></el-input>
        </el-form-item>
        <el-form-item label="客户编号">
        <el-select v-model="checkData.customerCode">
          <el-option
            v-for="item in cusList"
            :key="item.customerCode"
            :value="item.customerCode"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="付款方式">
          <el-select v-model="checkData.payType">
            <el-option label="全部" value=""></el-option>
            <el-option label="货到付款" :value="1"></el-option>
            <el-option label="款到发货" :value="2"></el-option>
            <el-option label="预付款到发货" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select v-model="checkData.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="新增" :value="1"></el-option>
            <el-option label="已发货" :value="2"></el-option>
            <el-option label="已收款" :value="3"></el-option>
            <el-option label="已了结" :value="4"></el-option>
            <el-option label="已预付" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="queryData" class="button">查询</el-button>
          <!-- <el-button @click="init" class="button">所有订单</el-button> -->
        </el-form-item>
      </el-form>
    </div>
       <el-table :data="checkList" stripe style="width:95%" class="el-table" @expand-change="detail">
         <el-table-column type="expand">
           <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" v-for="item in props.row.soitems" :key="item.productCode">
            <el-form-item label="产品编号">
              <span>{{item.productCode}}</span>
            </el-form-item>
             <el-form-item label="产品名称">
              <span>{{item.productName}}</span>
            </el-form-item>
             <el-form-item label="产品单位">
              <span>{{item.unitName}}</span>
            </el-form-item>
            <el-form-item label="产品数量">
              <span>{{item.num}}</span>
            </el-form-item>
             <el-form-item label="产品单价">
              <span>{{item.unitPrice}}</span>
            </el-form-item>
             <el-form-item label="产品总价">
              <span>{{item.itemPrice}}</span>
            </el-form-item>
          </el-form>
        </template>
         </el-table-column>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="soId" label="销售单编号" width="130"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>
      <el-table-column prop="customerName" label="客户名称" width="110"></el-table-column>
      <el-table-column prop="account" label="创建用户" width="80"></el-table-column>
      <el-table-column prop="tipFee" label="附加费用" width="80"></el-table-column>
      <el-table-column prop="productTotal" label="产品总价" width="80"></el-table-column>
      <el-table-column prop="soTotal" label="销售单总价" width="80"></el-table-column>
      <el-table-column prop="payType" label="付款方式" width="80"></el-table-column>
      <el-table-column prop="prePayFee" label="最低预付款" width="90"></el-table-column>
    <el-table-column prop="status" label="处理状态" width="90"></el-table-column>
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
</template>
<script>
export default {
    data(){
        return{
          checkData:{
            soId:'',
            customerCode:'',
            payType:1,
            startDate: "",
        endDate: "",
        status: 1
          },
          checkList:[],
          cusList:[],
           totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:0//当前页
        }
    },
    methods:{
      //查询条件订单
      queryData(){
         this.$axios
        .get("/api/main/sell/somain/query", {params: this.checkData})
        .then(response => {
          this.totalP=response.data.total
        this.pageS=response.data.pageSize
          this.checkList = response.data.list;
           for(let i=0;i<this.checkList.length;i++){
              if(this.checkList[i].payType==1) this.checkList[i].payType='货到付款'
              if(this.checkList[i].payType==2) this.checkList[i].payType='款到发货'
              if(this.checkList[i].payType==3) this.checkList[i].payType='预付款到发货'
              if(this.checkList[i].status==1) this.checkList[i].status='新增'
              if(this.checkList[i].status==2) this.checkList[i].status='已收货'
              if(this.checkList[i].status==3) this.checkList[i].status='已付款'
              if(this.checkList[i].status==4) this.checkList[i].status='已了结'
              if(this.checkList[i].status==5) this.checkList[i].status='已预付'
          }
        });
      },
       handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$axios.get("/api/main/sell/somain/query?page="+val,{params: this.checkData}).then(response => {
            this.checkList = response.data.list
        })
      },
      //所有订单
      // init(){
      //   this.$axios
      //   .get("/api/main/sell/somain/query")
      //   .then(response => {
      //     this.checkList = response.data.list;
      //     for(let i=0;i<this.checkList.length;i++){
      //         if(this.checkList[i].payType==1) this.checkList[i].payType='货到付款'
      //         if(this.checkList[i].payType==2) this.checkList[i].payType='款到发货'
      //         if(this.checkList[i].payType==3) this.checkList[i].payType='预付款到发货'
      //         if(this.checkList[i].status==1) this.checkList[i].status='新增'
      //         if(this.checkList[i].status==2) this.checkList[i].status='已收货'
      //         if(this.checkList[i].status==3) this.checkList[i].status='已付款'
      //         if(this.checkList[i].status==4) this.checkList[i].status='已了结'
      //         if(this.checkList[i].status==5) this.checkList[i].status='已预付'
      //     }
      //   });
      // },
      //展开显示销售单明细
    detail(row) {
        this.$axios
        .get("/api/main/sell/somain/queryItem?soId=" + row.soId)
        .then(response => {
          row.soitems = response.data;
        });
    },
       // 客户编号列表
    cuList() {
      this.$axios.get("/api/main/sell/customer/show").then(response => {
        this.cusList = response.data.list;
      });
    },
    },
    beforeMount() {
    this.queryData();
    this.cuList()
  }
}
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
.el-table,
.div1 {
  margin-top: 18px;
  margin-left: 18px;
}
.on,
.button {
  background-color: #da9595;
}
</style>