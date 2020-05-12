import {reqProduct,reqAddToCart} from '@/api'

//数据管理
const state={
    detailInfo: {}, //当前详情页信息
}
const actions={
    //获取商品数据的异步actions
    async getDetailInfo({commit},skuId){
        //获取请求结果
        const result = await reqProduct(skuId);
        if(result.code === 200){
            //获取data数据
            const detailInfo = result.data;
            //更新数据
            commit('GETDETAILINFO',detailInfo)
        }
    },
    //添加商品到购物车
    async addToCart({commit},{skuId,skuNum,callback}){
        //获取请求结果
        console.log(commit,skuId,skuNum);
        const result = await reqAddToCart(skuId,skuNum);
        if(result.code === 200){//只做简单确认是否发生成功的功能
            console.log('添加购物车成功');
            callback();
        }else{
            console.log('购物车添加失败');
            callback('添加购物车失败')
        }
    },
    async addToCart2({commit},{skuId,skuNum}){
        //获取请求结果
        console.log(commit,skuId,skuNum);
        const result = await reqAddToCart(skuId,skuNum);
        if(result.code === 200){//只做简单确认是否发生成功的功能
            console.log('添加购物车成功');
            return '' //async addToCart3函数是成功的
        }else{
            console.log('购物车添加失败');
            return '添加购物车失败' //async addToCart3函数是成功的
        }
    },
    async addToCart3({commit},{skuId,skuNum}){
        //获取请求结果
        console.log(commit,skuId,skuNum);
        const result = await reqAddToCart(skuId,skuNum);
        if(result.code === 200){//只做简单确认是否发生成功的功能
            console.log('添加购物车成功');
            return '' //async addToCart3函数是成功的
        }else{
            console.log('购物车添加失败');
            throw new Error('添加失败');
        }
    }
}

//更新数据
const mutations={
    GETDETAILINFO(state,detailInfo){
        state.detailInfo=detailInfo;
    }
}

//计算属性
const getters={
    //3级分类名称数据的对象要进行特殊处理
    categoryView(state){
        const categoryView = state.detailInfo.categoryView; //初始是undefined
        return categoryView||{}
    },
    //右侧商品的信息情况
    skuInfo(state){
        const skuInfo = state.detailInfo.skuInfo;
        return skuInfo||{}
    },
    //图片;列表
    skuImageList(state){//图片列表是个数组,所以此处要返回数组才可以
        const skuInfo = state.detailInfo.skuInfo;
        return skuInfo? skuInfo.skuImageList : [];
    },
    //右侧属性选择
    spuSaleAttrList(state){
        const skuInfo = state.detailInfo.spuSaleAttrList;
        console.log( skuInfo);
        return skuInfo? skuInfo : [];
    }
}

//暴露
export default{
    state,
    actions,
    mutations,
    getters
}