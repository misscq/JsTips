//配置路由相关信息
import Vue from 'vue'
import Router from 'vue-router'
//通过Vue.use(插件),安装插件
Vue.use(Router);
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
//创建Router对象
//映射关系
const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/category',
        component: Category
    },
    {
        path:'/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        component: Detail
    }
]
const router = new Router({
    //配置路由和组件之间的应用关系
    routes,
    mode:'history',//更改url为history
})

//将router传到vue实例中
export default router