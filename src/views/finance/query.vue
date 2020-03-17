<template>
    <div>
        <p class="p1">
      位置：财务收支
      <span>&gt;</span>收支查询
    </p>
    <div class="div1">
      <el-form :inline="true" :model="checkData" :rules="checkRules" ref="checkData" label-width="120px" class="demo-form-inline">
        <el-form-item label="相关单据号">
          <el-input v-model="checkData.no"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-input v-model="checkData.startDate"></el-input>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-input v-model="checkData.endDate"></el-input>
        </el-form-item>
        <el-form-item label="收支类型" prop="type">
          <el-select v-model="checkData.type">
            <el-option label="收入" :value="'收入'"></el-option>
            <el-option label="支出" :value="'支出'"></el-option>
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
        <el-form-item>
          <el-button @click="queryData('checkData')" class="button">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="checkList" stripe style="width:95%" class="el-table">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="payTime" label="(付款／收款)日期"></el-table-column>
      <el-table-column prop="ordercode" label="相关单据号"></el-table-column>
    <el-table-column prop="payPrice" label="(付款／收款)金额"></el-table-column>
    <el-table-column prop="account" label="经手人"></el-table-column>
    <el-table-column prop="payType" label="单据付款方式"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20]"
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
          type:'',
          startDate:'',
          endDate:'',
          payType:1,
          no:''
        },
        checkList: [],
          totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:0,//当前页
      checkRules:{
        type:[{
            type: "string",
            required: true,
            message: "请选择收支",
            trigger: "change"
        }
        ]
      }
      }
    },
    methods:{
      //查询
      queryData(checks){
        this.$refs[checks].validate(valid => {
          if (valid) {
            this.$axios
        .get("/api/main/finance/query", { params: this.checkData })
        .then(response => {
           this.totalP=response.data.total
        this.pageS=response.data.pageSize
          this.checkList = response.data.list;
        });
          }
          else{
            return this.$message.error('请选择收支类型');
          }
        })
        
      },
       handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$axios.get("/api/main/finance/query?page="+val,{ params: this.checkData }).then(response => {
            this.checkList = response.data.list
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
.on,.button {
  background-color: #da9595;
}
</style>