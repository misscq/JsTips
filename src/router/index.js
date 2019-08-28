//配置路由相关信息
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
//通过Vue.use(插件),安装插件
Vue.use(Router);

//创建Router对象
//映射关系
const routes = [
    {
        path:'',
        redirect:'/home'
    },
    {
        path:"/home",
        component: Home
    },
    {
        path:"/about",
        component: About
    }

]
const router = new Router({
    //配置路由和组件之间的应用关系
    routes,
    mode: 'history'
})

//将router传到vue实例中
export default router