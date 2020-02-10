<template>
  <div id="header">
    <headermenuleft></headermenuleft>
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
  }
</script>

<style scoped lang="scss">
  div#header
  {
    position:relative;
    height:$heightHeader;
    background-color:red;
    z-index:1000;
  }
</style>
