<template>
    <div>
        <p class="p1">
      位置：仓储管理
      <span>&gt;</span>库存盘点
    </p>
    <el-table :data="checkList" stripe style="width:95%" class="el-table">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="productCode" label="产品编号"></el-table-column>
    <el-table-column prop="name" label="产品名称"></el-table-column>
    <el-table-column prop="num" label="当前库存"></el-table-column>
    <el-table-column prop="poNum" label="采购在途数"></el-table-column>
    <el-table-column prop="soNum" label="预销售数"></el-table-column>
   <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="checkPro(scope.row)" class="el-button">盘点</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[4,10,20]"
      :page-size="pageS"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalP">
    </el-pagination>
    <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
 <el-form :model="list" label-width="120px">
    <el-form-item label="变化数量">
      <el-input v-model="list.num"></el-input>
    </el-form-item>
    <el-form-item label="变化类型">
          <el-select v-model="list.type">
            <el-option label="损耗" value="损耗"></el-option>
            <el-option label="盈余" value="盈余"></el-option>
          </el-select>
        </el-form-item>
    <el-form-item label="损益原因">
      <el-input v-model="list.description"></el-input>
    </el-form-item>
 </el-form>
 <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmL">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
const qs = require("querystring");
export default {
    data(){
      return{
        checkList:[],
        dialogFormVisible:false,
        list:{
          productCode:'',
          originNum:0,
          num:0,
          type:'',
          description:''
        },
         totalP:0,//总共条数
      pageS:0,//每页条数
      currentPage:1//当前页
      }
    },
    methods:{
      init(){
         this.$axios.get("/api/main/sell/product/show").then(response => {
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
        this.$axios.get("/api/main/sell/product/show?page="+val).then(response => {
            this.checkList = response.data.list
        })
      },
      checkPro(row){
        this.dialogFormVisible = true
        this.list.productCode=row.productCode
        this.list.originNum=row.num
      },
      confirmL(){
        this.dialogFormVisible=false
        this.$axios.get("/api/main/stock/checkstock",{params:this.list}).then(response => {
          if (response.data.code == 2) {
            this.init();
            return this.$message({
              message: " 盘点成功",
              type: "success"
            });
          } else {
            return this.$message.error('盘点失败');
          }
        });
      }
    },
   beforeMount() {
    this.init();
  }
}

 //this.$axios.get("/api/main/stock/checkstock?"+qs.stringify(this.list)).then(response => {
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
.el-table{
  margin-top:18px;
  margin-left:18px;
}
.el-button{
  background-color: #da9595;
}
</style>