//vue核心模塊 store
import Vue from 'vue'
import Vuex from "vuex"

//引入vuex的模块
import home from "./modules/home"
import user from "./modules/user"
import search from "./modules/search"
//聲明使用插件
Vue.use(Vuex);

const mutations={
    TEST(){
        console.log('wddsadsad');
    }
}

const state={
    a:'xiaobo'
}

const actions={
    test({commit}){
        commit('TEST');
    }
}

const getters={}

//向外暴露store
export default new Vuex.Store({
    mutations,
    state,
    actions,
    getters,
    modules:{
        home,
        user,
        search,
    }
})
