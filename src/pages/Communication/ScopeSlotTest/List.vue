<template>
  <ul>
    <li v-for="(item, index) in data" :key="index">
      <!-- 由父组件传递过来的结构   而且slot当中是属性会传递给父组件-->
      <slot :row="item" :index = "index"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    data: Array
  }
}
</script>