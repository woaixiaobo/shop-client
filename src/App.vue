<template>
  <div id="app">
    <h1>App</h1>
    <Header/>

    <router-view></router-view>

    <Footer/>
  </div>
</template>

<script>
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
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
