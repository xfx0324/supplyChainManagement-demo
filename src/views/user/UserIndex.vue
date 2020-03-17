<template>
  <div>
    <p class="p1">
      位置：系统管理
      <span>&gt;</span>首页
    </p>
    <div class="div">
      <h3>{{this.$store.state.loginUser}}欢迎使用信息管理系统</h3>
      <p>您登录的时间：{{this.$store.state.token|time}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataNew: new Date()
    };
  },
  filters:{
    time:function(value){
      return value.slice(0,4)+'-'+value.slice(4,6)+'-'+value.slice(6,8)+' '+value.slice(8,10)+':'+value.slice(10,12)+':'+value.slice(12,14)
    }
  }
};
</script>
<style scoped>
* {
  padding: 0;
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
.div{
    padding:18px;
}
h3{
    margin-bottom: 10px;
}
</style>
