<template>
<div class="div">
     <h2>供应链管理信息系统</h2>
        <el-form :model="user" label-width="60px" class="loginForm">
          <el-form-item label="账号">
              <el-input v-model="user.username" placeholder="账号" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input v-model="user.password" type="password" placeholder="密码" prefix-icon="el-icon-lock" ></el-input>
          </el-form-item>
          <el-form-item label="角色">
              <el-radio-group v-model="user.role">
                <el-radio label="member">工作人员</el-radio>
                <el-radio label="customer">客户</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item>
              <!-- <p class="err">{{error}}</p> -->
        <el-button @click="logIn">登录</el-button>
          </el-form-item>
        </el-form>
</div>
</template>
<script>
export default {
    data(){
        return {
            user: {
                username: '',
                password: '',
                role: 'member',
            },
            error: ''
        }
    },
    methods: {
        logIn(){
            if(this.user.username === '' || this.user.password === ''){
                this.error = '账号或密码不能为空'
                return
            }
            this.$store.dispatch('loginAction', this.user)
            .then(()=>{
                this.$router.push('/home')
            }, (msg)=>{
                this.$message(msg)
                this.error = msg
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style scoped>
.div{
    width: 70%;
    margin: auto;
    margin-top:100px;
    padding:30px;
    background-color: #da9595;
}
h2{
    color: rgb(90, 88, 88);
    margin-left: 150px;
    margin-bottom: 50px;
}
.loginForm{
    width: 600px;
    margin: auto;
}
.err{
    color: red;
    font-size: 13px;
}
</style>
