import axios from 'axios'
import store from '@/store'

// 拦截 ajax 请求
axios.interceptors.request.use(function (config) {
    // console.log(config, ' config')
    // 将登录的 token 放在请求头 Authorization 中发送给后端
    if(store.state.token)
        config.headers.Authorization = store.state.token
    return config
  }, function (error) {
    return Promise.reject(error)
    // return new Promise((resolve, reject) => {
    //     reject(error)
    // })
  })

  // 拦截 ajax 响应
// axios.interceptors.response.use(function(resp){
//   const result = resp.data
//   console.log('interceptors response')
//   if(result.code === 1){
//     MessageBox.alert(result.message, '登录提示', {
//       confirmButtonText: '确定',
//       callback: ()=>{
//         router.push('/login')
//       }
//     })

//     throw new Error(result.message)
//   }
//   return resp
// }, function(error){
//   return Promise.reject(error)
// })