import Vue from 'vue'
import VueRouter from 'vue-router'

const Home =() => import("../views/home/home")
const Cart =() => import("../views/cart/cart")
const Category =() => import("../views/category/category")
const Profile =() => import("../views/profile/profile")
const Detail =() => import("../views/detail/detail")

//解决连续点击报错问题
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

Vue.use(VueRouter)

  const routes = [
    {
      path:"",
      redirect:"/home"
    },
    {
      path:"/home",
      component:Home
    },
    {
      path:"/category",
      component:Category
    },
    {
      path:"/cart",
      component:Cart
    },
    {
      path:"/profile",
      component:Profile
    },
    {
      path:"/detail/:iid",
      //动态获取id
      component:Detail
    }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
