<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- 原生实现带文字提示的代码  需要借用a标签的 title 属性-->
    <!-- <a href="javascript:">
      <el-button type="primary" title="添加" size = 'mini' icon="el-icon-plus" @click="add"></el-button>
    </a> -->
    <!-- 利用$attrs与v-bind  $listeners与v-on结合,实现组件的复用
        注意: 如果这个属性子组件当中用props接受了,那么$attrs是接收不到的
    -->
    <MyComponent type="primary" title="添加" size = 'mini' icon="el-icon-plus" @click="add"></MyComponent>
    <!-- 双击添加,velement没有自定义双击事件,所以此处用native来使这个事件变为原生的dom事件 -->
    <MyComponent type="primary" title="双击添加" size = 'mini' icon="el-icon-plus" @dblclick.native="add2"></MyComponent>
    <MyComponent type="info" title="修改" size = 'mini' icon="el-icon-plus" @click="update"></MyComponent>
    <MyComponent type="danger" title="删除" size = 'smale' icon="el-icon-plus" @click="remove"></MyComponent>

  </div>
</template>

<script type="text/ecmascript-6">
  import MyComponent from './MyComponent'
  export default {
    name: 'AttrsListenersTest',

    methods: {
      add () {
        alert('add()');
      },

      add2 () {
        alert('add2()');
      },
      update () {
        alert('update()');
      },
      remove () {
        alert('remove()');
      }
    },

    components: {
      MyComponent
    }
  }
</script>
