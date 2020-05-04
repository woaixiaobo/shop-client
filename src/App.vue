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
export default {
  name: 'App',
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
