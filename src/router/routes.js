import Home from "@/pages/Home"
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'

export default [
    {
        path:'/',
        component:Home,
    },
    {
        name:'Search',
        path: '/search/:keyName?',
        component: Search,
        //props方式传递参数
        props:route=>({
            keyName:route.params.keyName,
            name:route.query.name,
        })
    },
    
    {
        path: '/register',
        component: Register,
        meta:{
            isHideFooter:true,
        }
    },
    
    {
        path: '/login',
        component: Login,
        meta:{
            isHideFooter:true,
        }
    }
]