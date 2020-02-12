<template>
  <div id="header">
    <div class="sidebarShowLeft" @click="toggleSideBar('left')">&#9776;</div>
    <headermenuleft></headermenuleft>
    <div class="sidebarShowRight" @click="toggleSideBar('right')">&#9776;</div>
    <headermenuright></headermenuright>
  </div>
</template>

<script>
  import HeaderMenuLeft from './HeaderMenuLeft'
  import HeaderMenuRight from './HeaderMenuRight'

  export default {
    name:'HeaderMenu',
    components: {
      headermenuleft: HeaderMenuLeft,
      headermenuright: HeaderMenuRight,
    },
    data: function () {
      return {}
    },
    methods: {
      toggleSideBar(sSide) {
        this.$emit('toggle-side-bar', sSide)
      }
    }
  }
</script>

<style scoped lang="scss">
  div#header
  {
    position:relative;
    height:$heightHeader;
    background-color:red;
    z-index:1000;

    .sidebarShowLeft, .sidebarShowRight
    {
      padding: 0px 10px;
      height:$heightHeader;
      line-height:$heightHeader;
      float:left;
      cursor:pointer;
    }
    .sidebarShowRight
    {
      float:right;
    }
  }
</style>
