<template>
  <div>
    <Header/>

    <router-view></router-view>
  
    <!-- <Footer v-show="$route.path!=='/register'&&$route.path!=='/login'"/> -->
    <Footer v-show="!$route.meta.isHideFooter"/>
  </div>
</template>

<script>
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import {reqBaseCategoryList, reqLogin} from '@/api'
export default {
  name: 'App',
  async mounted() {
    //测试请求接口
    const result = await reqBaseCategoryList();
    console.log('result()',result);
    const result2 = await reqLogin('13700000000', '111111');
    console.log('result2',result2);
  },
  components: {
    Header,
    Footer,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
