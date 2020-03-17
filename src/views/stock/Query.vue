<template>
  <div>
    <p class="p1">
      位置：仓储管理
      <span>&gt;</span>库存查询
    </p>
    <div class="div1">
      <el-form :inline="true" :model="checkData" class="demo-form-inline">
        <el-form-item label="产品编号">
          <el-input v-model="checkData.productCode"></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="checkData.name"></el-input>
        </el-form-item>
        <el-form-item label="库存数量最小值">
          <el-input v-model="checkData.min"></el-input>
        </el-form-item>
        <el-form-item label="库存数量最大值">
          <el-input v-model="checkData.max"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="queryData" class="button">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="checkList" stripe style="width:95%" class="el-table">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="productCode" label="产品编号"></el-table-column>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="num" label="当前库存"></el-table-column>
      <el-table-column prop="poNum" label="采购在途数"></el-table-column>
      <el-table-column prop="soNum" label="预销售数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="checkPro(scope.row)" class="button">查看产品库存记录</el-button>
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
    <!-- 库存记录对话框 -->
    <el-dialog title="产品库存记录表格" :visible.sync="dialogTable" width="66%">
      <div class="div1">
        <el-button @click="queryList('one',1)" :class="{on:tab==='one'}">入库记录</el-button>
        <el-button @click="queryList('two',2)" :class="{on:tab==='two'}">出库记录</el-button>
      </div>
      <el-table :data="list" style="width: 100%" class="table">
        <el-table-column property="stockTime" :label="tab=='one'?'入库时间':'出库时间'" width="150"></el-table-column>
        <el-table-column property="orderCode" :label="tab=='one'?'相关采购单号':'相关销售单号'"></el-table-column>
        <el-table-column property="createUser" :label="tab=='one'?'入库经手人':'出库经手人'"></el-table-column>
        <el-table-column property="stockNum" :label="tab=='one'?'入库数量':'出库数量'"></el-table-column>
        <el-table-column property="stockType" :label="tab=='one'?'入库类型':'出库类型'"></el-table-column>
        <!-- <el-table-column :label="tab=='one'?'入库类型':'出库类型'" v-show="stockType==2&&tab==two">销售出库</el-table-column> -->
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTable = false" class="button">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkList: [],
      checkData: {
        productCode: "",
        name: "",
        min: 0,
        max: 0
      },
      list: [],
      tab:'one',
      dialogTable: false,
      productCode: "",
      totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:0//当前页
    };
  },
  methods: {
    // init() {
    //   this.$axios.get("/api/main/sell/product/show").then(response => {
    //     this.checkList = response.data.list;
    //   });
    // },
    //根据条件查询
    queryData() {
      this.$axios
        .get("/api/main/stock/query", { params: this.checkData })
        .then(response => {
          this.totalP=response.data.total
        this.pageS=response.data.pageSize
          this.checkList = response.data.list;
        });
    },
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$axios.get("/api/main/stock/query?page="+val, { params: this.checkData }).then(response => {
            this.checkList = response.data.list
        })
      },
    // 查看产品库存记录
    checkPro(row) {
      this.dialogTable = true;
      this.productCode = row.productCode;
      this.queryList('one',1)
    },
    //入库或出库记录
    queryList(style,id) {
      this.tab=style
        this.$axios
          .get(
            "/api/main/stock/alterRecord?productCode=" +
              this.productCode +
              "&stockType="+id
          )
          .then(response => {
            this.list = response.data.data.list;
           if(id==1){
             for(let i=0;i<this.list.length;i++){
               if(this.list[i].stockType==1){
                 this.list[i].stockType='采购入库'
               }
               if(this.list[i].stockType==3){
                 this.list[i].stockType='盘点入库'
               }
             }
           }
           if(id==2){
             for(let i=0;i<this.list.length;i++){
               if(this.list[i].stockType==2){
                 this.list[i].stockType='销售出库'
               }
               if(this.list[i].stockType==4){
                 this.list[i].stockType='盘点出库'
               }
             }
           }
          });
    }
  },
  beforeMount() {
    // this.init();
    this.queryData()
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
.el-table,
.div1 {
  margin-top: 18px;
  margin-left: 18px;
}
.on,.button {
  background-color: #da9595;
}
</style>