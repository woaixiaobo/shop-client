<template>
  <a>
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  props: ['xxx'],

  beforeCreate() {
    console.log('---', this.$attrs, this.$listeners)
  }
}
</script>

<style>

</style>