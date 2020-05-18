<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 原生dom事件 有两种
      1.在html标签上绑定是事件都是原生的dom事件
      2.在组件上通过修饰符来绑定的事件也是原生的dom事件
        但是是绑定在跟标签上边的(事件委托)
      原理:当用户进行页面操作时,页面就会自动创建并封闭包含相关数据的事件对象
          ,分发对应的事件,从而触发事件监听回调函数调用
          事件对象就是event(事件数据对象)
          $event是浏览器自动穿件的event对象,默认传递给事件监听回调函数的

    -->
    <button @click="test1">原生dom事绑定</button>
    <!-- $event 就是浏览器自动创建的event,并且默认传给事件监听回调函数的 event -->
    <button @click="test1($event)">原生dom事绑定</button>
    <!-- <Event1 @click="test2"/>
      此时点击是没有效果的,因为在组件上绑定的都是自定义的
      若想使用原生dom就用 native 修饰
      并且是绑定在其跟标签上边的(会形成事件委托)
    -->
    <Event1 @click.native="test2"/>
    <br>
    <br>
    <!-- 自定义事件  绑在在组件上(只能绑定在组件上)
    事件名是任意的,可以和原生事件名相同,只有执行 $emit 分发自定义事件进行触发就行
    用来实现子组件向父组件通信,和函数类型的props功能一样
    注意原生当中的 $evetn是 自定义事件回调的 data 数据
        而且 $event 是可以是任意类型的
        并不是事件数据对象!
    -->
    <Event2 @click="test3" @xxx="test4"/>
    <br>
    <!--  $event 就是 自定义事件的 data 数据 -->
    <Event2 @click="test3($event)" @xxx="test4"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Event2 from './Event2.vue'
  import Event1 from './Event1'
  export default {
    name: 'EventTest',

    components: {
      Event2,
      Event1
    },
    methods: {
      test1(event){
        alert(event.target.innerHTML);
      },
      test2(event){
        alert('测试组件原生dom'+event.target.innerHTML);
      },
      test3(data){
        alert('自定义事件'+data);
      },
      test4(data){
        alert('自定义事件'+data.name);
      }
    },
  }
</script>
