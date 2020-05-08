//用來管理首頁的vue模塊

//引入api當中發送首頁請求的函數
import {reqBaseCategoryList,reqBanners,reqFloors} from '@/api'

//对外暴露vuex的配置
export default{
    state:{
        baseCategoryList: [],
        banners:[],
        floors:[],
    },
    actions:{
        //发送ajax请求,进行异步操作
        async getBaseCategoryList({commit}){
            //发送异步请求
            const reslut = await reqBaseCategoryList();
            //成功后,将数据交给mutations处理,进行数据更新
            //判断状态码是否正确
            if(reslut.code===200){
                const baseCategoryList = reslut.data;
                commit('GETBASECATEGORYLIST',baseCategoryList)
            }
        },
        async getBanners({commit}){
            //发送异步请求
            const reslut = await reqBanners();
            //成功后,将数据交给mutations处理,进行数据更新
            //判断状态码是否正确
            // console.log(reslut);
            // if(reslut.code===200){
                const banners = reslut;
                commit('GETBANNERS',banners)
            // }
        },
        async getFloors({commit}){
            //发送异步请求
            const reslut = await reqFloors();
            //成功后,将数据交给mutations处理,进行数据更新
            //判断状态码是否正确
            if(reslut.code===200){
                const floors = reslut.data;
                commit('GETFLOORS',floors)
            }
        }
    },
    mutations:{
        GETBASECATEGORYLIST(state,baseCategoryList){
            state.baseCategoryList=baseCategoryList;
        },
        GETBANNERS(state,banners){
            state.banners=banners;
        },
        GETFLOORS(state,floors){
            state.floors=floors;
        },
    }
}