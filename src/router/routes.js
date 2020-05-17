// import Home from "@/pages/Home"
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'
// import store from '@/store'
export default [{
        path: '/',
        //component: Home,  //默认的方式
        //懒加载的方式,只有(第一次)在跳转到对应路由的时候才会被调用,然后打包这个js文件
        //第二次在调用时不会重新打包 因为第一次已经打包好了
        component:()=> import ('@/pages/Home')
    },
    {
        name: 'Search',
        path: '/search/:keyName?',
        component: Search,
        //props方式传递参数
        props: route => ({
            keyName: route.params.keyName,
            name: route.query.name,
        })
    },
    {
        name: 'detail',
        path: '/detail/:id',
        component: Detail,
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        beforeEnter:(to,from,next)=>{
            console.log(JSON.parse(sessionStorage.getItem('SKU_INFO_KEY')));
            if(JSON.parse(sessionStorage.getItem('SKU_INFO_KEY'))&&to.query.skuNum){
                //只有携带的skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
                next();
            }else{//其他直接返回首页
                next('/')
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
    },
    {
        path: '/trade',
        component: Trade,
        beforeEnter:(to,from,next)=>{
            // console.log(to,from);
            if(from.path==='/shopcart'){//只有从购物车页面才能跳转到结算页面
                next();
            }else{//其他直接返回首页
                next('/shopcart')
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        //将route当中的query参数改为props的方式传递
        props:route=>({orderId:route.query.orderId}),
        beforeEnter:(to,from,next)=>{
            if(from.path==='/trade'){//只有从交易页面才能跳转到交易成功页面
                next();
            }else{//其他直接返回首页
                next('/trade')
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        beforeEnter:(to,from,next)=>{
            if(from.path==='/pay'){//只有从交易页面才能跳转到交易成功页面
                next();
            }else{//其他直接返回首页
                next('/pay')
            }
        }
    },
    {
        path: '/center',
        component: Center,
        children:[
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'groupbuy',
                component: GroupBuy,
            },
            {
                path: '',
                redirect: 'myorder'
            }
        ]
    },
    {
        path: '/register',
        component: Register,
        meta: {
            isHideFooter: true,
        }
    },

    {
        path: '/login',
        component: Login,
        meta: {
            isHideFooter: true,
        },
        // beforeEnter:(to,from,next)=>{ //路由前置守卫
        //     //如果还没有登录就放行
        //     if(!store.state.user.userInfo.name){
        //         next();
        //     }else{//如果登录了就跳转到首页
        //         next('/');  
        //     }
        // }
    }
]