<template>
  <div class="title">
    {{ title }}
    <div @click="clickReload">&#8634;</div>
  </div>
</template>

<script>
  export default {
    name: 'SideBarTitle',
    props: {
      title: String
    },
    methods: {
      clickReload() {
        this.$emit('reload')
      }
    }
  }
</script>

<style scoped lang="scss">
  div.title {
    height:25px;
    line-height:25px;
    vertical-align: middle;
    padding-left:10px;
    background-color:$secondary-background-color;
    position:relative;

    div
    {
      position:absolute;
      right:2px;
      top:2px;
      bottom:2px;
      width:21px;
      line-height:21px;
      text-align: center;
      vertical-align: center;
      background-color:$primary-color;
      color:$primary-background-color;
      cursor:pointer;
    }
  }
</style>
