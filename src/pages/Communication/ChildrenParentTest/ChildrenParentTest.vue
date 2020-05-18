<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoney1(100)">找小明借钱100</button><br>
    <button @click="borrowMoney2(150)">找小红借钱150</button><br>
    <button @click="borrowMoney3(200)">找所有孩子借钱200</button><br>
    
    <br>
    <!-- 单独的话,就用ref来绑定这个组件 -->
    <Son ref="son"/>

    <br>
    <Daughter ref="daughter"/>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },

  methods: {
    borrowMoney1(money){
      //得到son组件对象
      const son = this.$refs.son;
      //更新son组件内部的数据
      //1.直接更新
      // son.money -= money;
      //2.调用其内部的方法
      son.pullMoney(money);
      //更新自身的数据
      this.money +=money;
    },
    borrowMoney2(money){
      //得到son组件对象
      const daughter = this.$refs.daughter;
      //更新son组件内部的数据
      //1.直接更新
      // son.money -= money;
      //2.调用其内部的方法
      daughter.pullMoney(money);
      //更新自身的数据
      this.money +=money;
    },
    // 找所有孩子借钱  就是对每个子组件进行操作
    borrowMoney3(money){
      //先用$children得到所有子组件形成一个数组,然后遍历每个子组件,然后进行数据操作
      this.$children.forEach(child=>{
        child.pullMoney(money);
        //每操作一个子组件自身数据都发生一次变化
        this.money += money;
      })
    },
  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
