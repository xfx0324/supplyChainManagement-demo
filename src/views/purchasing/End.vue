<template>
    <div>
         <p class="p1">位置：采购管理<span>&gt;</span>采购单了结</p>
         <div class="div1">
      <el-button @click="queryList(1)" :class="{on:tab===1}">货到付款</el-button>
      <el-button @click="queryList(2)" :class="{on:tab===2}">款到发货</el-button>
      <el-button @click="queryList(3)" :class="{on:tab===3}">预付款到发货</el-button>
    </div>
    <el-table :data="list" style="width: 100%" @expand-change="detail" class="table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" v-for="item in props.row.poitems" :key="item.productCode">
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
      <el-table-column prop="poId" label="采购单编号"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="venderName" label="供应商名称" ></el-table-column>
      <el-table-column prop="tipFee" label="附加费用"></el-table-column>
      <el-table-column prop="productTotal" label="产品总价"></el-table-column>
      <el-table-column prop="poTotal" label="订单总价"></el-table-column>
      <el-table-column prop="payType" label="付款方式"></el-table-column>
      <el-table-column prop="prePayFee" label="最低预付款"></el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="endOrder(scope.row)" class="button">订单了结</el-button>
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
</template>
<script>
export default {
    data() {
    return {
        list:[],
       tab:1,
       totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:0//当前页
    };
  },
  methods: {
    //根据付款方式获得了结采购单
    queryList(payType) {
      this.tab=payType
      this.$axios
        .get("/api/main/purchase/pomain/show?type=4&payType="+payType)
        .then(response => {
          this.totalP=response.data.total
        this.pageS=response.data.pageSize
          this.list = response.data.list;
        });
    },
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$axios.get("/api/main/purchase/pomain/show?type=4&payType="+this.tab+"&page="+val).then(response => {
            this.list = response.data.list
        })
      },
    //展开显示采购单明细
    detail(row) {
        this.$axios
        .get("/api/main/purchase/pomain/queryItem?poId=" + row.poId)
        .then(response => {
          row.poitems = response.data;
        });
    },
    //采购单了结
    endOrder(row){
        this.$axios
        .get("/api/main/purchase/pomain/end?poId="+row.poId+"&payType="+this.tab).then(response => {
          if (response.data.code == 2) {
            this.queryList(this.tab)
            return this.$message({
              message: "采购单了结成功",
              type: "success"
            });
          } else {
            return this.$message.error('采购单了结失败');
          }
        });
    }
  },
  beforeMount() {
    this.queryList(1);
  }
}
</script>
<style  scoped>
*{
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
.div1,.table{
    margin-top:18px;
    margin-left: 18px;
}
.on,.button {
  background-color: #da9595;
}
</style>