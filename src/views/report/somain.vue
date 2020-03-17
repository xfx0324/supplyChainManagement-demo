<template>
    <div>
        <p class="p1">
      位置：业务报表
      <span>&gt;</span>月度销售报表
    </p>
     <div class="block div1">
      <el-date-picker v-model="time" type="month" placeholder="选择月"></el-date-picker>
      <el-button @click="queryData" class="button">查询</el-button>
      <span class="demonstration span">请选择时间(不能为空)</span>
      <table class="table1" width="95%">
        <tr>
          <td>销售单总数</td>
          <td>已了结数</td>
          <td>销售总金额</td>
          <td>已付款金额</td>
        </tr>
        <tr>
          <td>{{mainList.totalnum}}</td>
          <td>{{mainList.endtotalnum}}</td>
          <td>{{mainList.sototal}}</td>
          <td>{{mainList.totalpay}}</td>
        </tr>
      </table>
    </div>
    <el-table :data="detailList" stripe style="width:95%" class="el-table">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="soId" label="销售编号" width="130px"></el-table-column>
      <el-table-column prop="customerCode" label="客户编号"></el-table-column>
      <el-table-column prop="customerName" label="客户名称"></el-table-column>
      <el-table-column prop="createTime" label="销售日期" width="150px"></el-table-column>
      <el-table-column prop="stockUser" label="经手人"></el-table-column>
      <el-table-column prop="soTotal" label="销售单总金额"></el-table-column>
      <el-table-column prop="prePayFee" label="未付款金额"></el-table-column>
      <el-table-column prop="status" label="处理状态"></el-table-column>
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
time: "",
      mainList: {},
      detailList: [],
       totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:0//当前页
        }
    },
    methods:{
       queryData() {
      let year = this.time.getFullYear();
      let month = this.time.getMonth() + 1;
      if (month < 10) month = "0" + month;
      this.time = year + "-" + month;
      this.$axios
        .get("/api/main/report/somain/main?time=" + this.time)
        .then(response => {
          this.mainList = response.data;
          this.totalP=response.data.details.total
        this.pageS=response.data.details.pageSize
          this.detailList = response.data.details.list;
          for(let i=0;i<this.detailList.length;i++){
              if(this.detailList[i].payType==1) this.detailList[i].payType='货到付款'
              if(this.detailList[i].payType==2) this.detailList[i].payType='款到发货'
              if(this.detailList[i].payType==3) this.detailList[i].payType='预付款到发货'
              if(this.detailList[i].status==1) this.detailList[i].status='新增'
              if(this.detailList[i].status==2) this.detailList[i].status='已收货'
              if(this.detailList[i].status==3) this.detailList[i].status='已付款'
              if(this.detailList[i].status==4) this.detailList[i].status='已了结'
              if(this.detailList[i].status==5) this.detailList[i].status='已预付'
          }
        }); 
       },
        handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$axios.get("/api/main/report/somain/main?time=" + this.time+"&page="+val).then(response => {
             this.mainList = response.data;
            this.detailList = response.data.details.list;
        })
      },
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
.el-table,
.div1 {
  margin-top: 18px;
  margin-left: 18px;
}
.button {
  background-color: #da9595;
}
.span {
  color: rgb(141, 138, 138);
  font-size: 14px;
}
.table1{
    margin-top:18px;
    color: rgb(95, 92, 92);
}
.table1 tr:nth-child(1){
  background-color:#da9595;
}
.table1 tr:nth-child(2){
  background-color:white;
}
</style>