import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
// import UserIndex from '@/views/user/UserIndex'
// import UserControl from '@/views/user/UserControl'
// import UserAdd from '@/views/user/UserAdd'
// import UserModification from '@/views/user/UserModification'
// import Supplier from '@/views/purchasing/Supplier'
// import AddSupplier from '@/views/purchasing/AddSupplier'
// import ModificationSupplier from '@/views/purchasing/ModificationSupplier'
// import Add from '@/views/purchasing/Add'
// import End from '@/views/purchasing/End'
// import Search from '@/views/purchasing/Search'
import Cookies from 'js-cookie'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      // components:()=>import('@/views/Login')
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {path: '', component:()=>import('@/views/user/UserIndex')},
        {path: '/home/user/userControl', component:()=>import('@/views/user/UserControl')},
        {path: '/home/user/userAdd', component:()=>import('@/views/user/UserAdd')},
        {path:'/home/user/userModification',component:()=>import('@/views/user/UserModification')},
        {path: '/home/purchasing/supplier', component:()=>import('@/views/purchasing/Supplier')},
        {path: '/home/purchasing/addSupplier', component:()=>import('@/views/purchasing/AddSupplier')},
        {path: '/home/purchasing/new', component:()=>import('@/views/purchasing/New')},
        {path: '/home/purchasing/add', component:()=>import('@/views/purchasing/Add')},
        {path: '/home/purchasing/end', component:()=>import('@/views/purchasing/End')},
        {path: '/home/purchasing/search', component:()=>import('@/views/purchasing/Search')},
        {path: '/home/sell/productCategory', component:()=>import('@/views/sell/ProductCategory')},
        {path: '/home/sell/proCatAdd', component:()=>import('@/views/sell/proCatAdd')},
        {path: '/home/sell/productControl', component:()=>import('@/views/sell/ProductControl')},
        {path: '/home/sell/proAdd', component:()=>import('@/views/sell/ProAdd')},
        {path: '/home/sell/customer', component:()=>import('@/views/sell/Customer')},
        {path: '/home/sell/customerAdd', component:()=>import('@/views/sell/CustomerAdd')},
        {path: '/home/sell/orderList', component:()=>import('@/views/sell/OrderList')},
        {path: '/home/sell/addOrder', component:()=>import('@/views/sell/AddOrder')},
        {path: '/home/sell/end', component:()=>import('@/views/sell/End')},
        {path: '/home/sell/query', component:()=>import('@/views/sell/Query')},
        {path: '/home/stock/inStock', component:()=>import('@/views/stock/InStock')},
        {path: '/home/stock/outStock', component:()=>import('@/views/stock/OutStock')},
        {path: '/home/stock/query', component:()=>import('@/views/stock/Query')},
        {path: '/home/stock/checkStock', component:()=>import('@/views/stock/CheckStock')},
        {path: '/home/finance/pay', component:()=>import('@/views/finance/Pay')},
        {path: '/home/finance/receipt', component:()=>import('@/views/finance/Receipt')},
        {path: '/home/finance/query', component:()=>import('@/views/finance/Query')},
        {path: '/home/report/pomain', component:()=>import('@/views/report/Pomain')},
        {path: '/home/report/somain', component:()=>import('@/views/report/Somain')},
        {path: '/home/report/payment', component:()=>import('@/views/report/Payment')},
        {path: '/home/report/instock', component:()=>import('@/views/report/Instock')},
        {path: '/home/report/outstock', component:()=>import('@/views/report/Outstock')},
        {path: '/home/report/stock', component:()=>import('@/views/report/Stock')}
      ],
      // meta: {
      //   requireAuth: true // 需要验证登录权限
      // }
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   if(to.path==='/'){ 
//     next()
//   }else{
//     let user=Cookies.get('loginUser')
//     if(user==null){
//       next('/')
//     }else{
//       next()
//     }
//   }
// })
export default router