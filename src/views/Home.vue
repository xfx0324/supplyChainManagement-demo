<template>
  <div>
    <el-container>
      <el-header class="header" height="100px">
        <h1>供应链管理信息系统</h1>
        <span>系统当前时间: {{time}}</span>
        </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="/"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :unique-opened="true"
            :collapse="isCollapse" router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home">首页</el-menu-item>
                 <el-menu-item index="/home/user/userControl">用户管理</el-menu-item>
                <el-menu-item @click="exitLogin">重新登录</el-menu-item>
                <el-menu-item @click="exitLogin">退出系统</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">采购管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/purchasing/supplier">供应商管理</el-menu-item>
                <el-menu-item index="/home/purchasing/new">新添采购单</el-menu-item>
                <el-menu-item index="/home/purchasing/end">采购单了结</el-menu-item>
                <el-menu-item index="/home/purchasing/search">采购单查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">仓储管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/stock/inStock">入库登记</el-menu-item>
                <el-menu-item index="/home/stock/outStock">出库登记</el-menu-item>
                <el-menu-item index="/home/stock/checkStock">库存盘点</el-menu-item>
                <el-menu-item index="/home/stock/query">库存查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">财务收支</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/finance/receipt">收款登记</el-menu-item>
                <el-menu-item index="/home/finance/pay">付款登记</el-menu-item>
                <el-menu-item index="/home/finance/query">收支查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">销售管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/sell/productCategory">产品分类管理</el-menu-item>
                <el-menu-item index="/home/sell/productControl">产品管理</el-menu-item>
                <el-menu-item index="/home/sell/customer">客户管理</el-menu-item>
                <el-menu-item index="/home/sell/orderList">新添销售单</el-menu-item>
                <el-menu-item index="/home/sell/end">销售单了结</el-menu-item>
                <el-menu-item index="/home/sell/query">销售单查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">业务报表</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/report/pomain">月度采购报表</el-menu-item>
                <el-menu-item index="/home/report/somain">月度销售报表</el-menu-item>
                <el-menu-item index="/home/report/payment">月度收支登记表</el-menu-item>
                <el-menu-item index="/home/report/instock">月度入库报表</el-menu-item>
                <el-menu-item index="/home/report/outstock">月度出库报表</el-menu-item>
                <el-menu-item index="/home/report/stock">产品库存报表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">网上销售</span>
              </template>
              <el-menu-item-group>
                <el-menu-item >客户注册</el-menu-item>
                <el-menu-item >商品展示</el-menu-item>
                <el-menu-item >网上下单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { now } from "@/utils/date.js";
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      isCollapse:false,
      time:now()
    };
  },
  methods: {
     now(){
    const curr = new Date()
    let year = curr.getFullYear()
    let month = curr.getMonth() + 1
    if (month < 10) month = '0' + month
    let date = curr.getDate()
    if (date < 10) date = '0' + date
    let hour = curr.getHours()
    if (hour < 10) hour = '0' + hour
    let minutes = curr.getMinutes()
    if (minutes < 10) minutes = '0' + minutes
    let seconds = curr.getSeconds()
    if (seconds < 10) seconds = '0' + seconds
    this.time=year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds
    setTimeout(this.now,1000)
},

    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    exitLogin(){
      this.$router.push("/login");
      Cookies.remove('loginUser');
      Cookies.remove('token');
    }
  },
  created(){
    this.now()
  }
};
</script>
<style scoped>
*{
  padding: 0;
  margin: 0;
}
.header{
  background-color:#da9595;
  display:flex;
}
.header h1{
  margin: 30px;
color:rgb(87, 84, 84);
}
.header span{
  margin-left:750px;
  margin-top:33px;
  font-size:14px;
  color:rgb(59, 58, 58);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>