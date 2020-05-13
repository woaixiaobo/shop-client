import {reqCartLit,reqCheckCartItem,reqAddToCart,reqDeleteCartItem} from '@/api'
//数据管理
const state={
    cartList: [] ,//购物项的列表
}
const actions={
    //获取商品数据的异步actions
    async getCartLit({commit}){
        //获取请求结果
        const result = await reqCartLit();
        if(result.code === 200){
            //获取data数据
            const cartList = result.data;
            // console.log(cartList);
            //更新数据
            commit('GETCARTLIT',{cartList}) // 提交给mutation是包含数据的对象
        }
    },
    //选中状态的切换
    async checkCartItem({commit},{skuId,isChecked}){
        console.log(commit);
        //发送状态切换的请求
        const result = await reqCheckCartItem(skuId,isChecked);
        if(result.code !== 200){//请求失败时,提示失败
            throw new Error(result.message||'请求失败')
        }
    },
    /* 
    context对象的结构:
    {
      state,      // 等同于 `store.state`，若在模块中则为局部状态
      commit,     // 等同于 `store.commit`   
      dispatch,   // 等同于 `store.dispatch`
      getters,    // 等同于 `store.getters`
    }
   */ //点击全选全不选进行状态的切换
   //因为没有发送多个请求的接口,所以这里遍历所有购物项,然后进行单独发送即可
   //但是要根据这个函数的promise进行错误的状态提示,此处发送了多个异步的actions请求,每个请求都有一个promise的状态
   //所以把这些状态搜集起来,然后进行统一处理,只有所有的promise都是成功的,次函数的promise才能成功
   //否则在就会报错,组件当中进行抛错处理即可
   //async checkAllCartItems({state, commit, dispatch, getters}, checked){
    async checkAllCartItems({state, dispatch}, checked){
        //传递过来的checked是全选框的值(true或者false),而发生请求需要发1或者0,
        //所以此处判断checked的值来进行赋值,在用作请求参数即可
        const isChecked = checked?1:0;
        //收集所有的异步的actions返回的promise
        const promises=[];
        //遍历所有购物项,并且发送请求
        state.cartList.forEach(item=>{
            //当购物项原本的勾选状态与更新状态一样时,不重复发送请求,直接返回
            if(item.isChecked===isChecked) return;
            //让每个购物项都去发送请求(就利用actions当中的方法即可),更新勾选状态
            const promise = dispatch('checkCartItem',{skuId:item.skuId,isChecked});
            //将每个异步的actions的promise添加到数据当中
            promises.push(promise);
        });
        // console.log(Promise.all(promises));
        //利用promise.all来对所有的promise进行处理,所有的promise都为正确时,才为正确
        return Promise.all(promises);
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
    /**
     * 添加到购物车的异步actions,如果是已经存在的购物项,则增加数量
     * skuId 购物项的id
     * skuNum 购物项的增加或者减少的数量 
     */
    async addToCart3({commit},{skuId,skuNum}){
        //获取请求结果
        console.log(commit,skuId,skuNum);
        const result = await reqAddToCart(skuId,skuNum);
        if(result.code !== 200){//失败
            throw new Error('添加失败'); // async函数的promise就是失败的
        }
    },
    //删除一个商品信息
    async deleteCart({commit},skuId){
        console.log(commit);
        //发送api请求
        const result = await reqDeleteCartItem(skuId);
        if(result.code !== 200){//失败
            throw new Error('添加失败'); // async函数的promise就是失败的
        }
    },
    //删除选中商品
    async deleteAllCart({state, dispatch}){
        //收集所有的异步的actions返回的promise
        const promises=[];
        //遍历所有的购物项,判断出选中的购物项
        state.cartList.forEach(item=>{
            if(item.isChecked===1){
                //取出每一项的skuId 进行deleteCart的传参
                const skuId = item.skuId
                //发送api请求
                const promise =dispatch('deleteCart',skuId);
                promises.push(promise);
            }
        })
        return Promise.all(promises);
    },

}

//更新数据
const mutations={
    GETCARTLIT(state,{cartList}){
        state.cartList=cartList;
    }
}

//计算属性
const getters={
    totalCount(state){
        //原始的方法
        // let total = 0; //总件数初始化
        // state.cartList.forEach(item=>{
        //     if(item.isChecked===1){
        //         total+=item.skuNum
        //     }
        // })
        // return total

        //简洁的方法  使用数组的reduce方法 进行累加
        return state.cartList.reduce((pre,item)=>{
            return item.isChecked===1?pre+item.skuNum:pre
        },0)

    },

    totalPrice(state){
        //原始的方法
        // let total = 0; //总件数初始化
        // state.cartList.forEach(item=>{
        //     if(item.isChecked===1){
        //         total+=item.skuNum*item.cartPrice
        //     }
        // })
        // return total

        //简洁的方法  使用数组的reduce方法 进行累加
        return state.cartList.reduce((pre,item)=>{
            return item.isChecked===1?pre+item.skuNum*item.cartPrice:pre
        },0)

    }
}

//暴露
export default{
    state,
    actions,
    mutations,
    getters
}