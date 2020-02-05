<template>
  <div id="ContentTabPanelPhp"></div>
</template>

<script>
  export default {
    name: 'ContentTabPanelPhp',
    props: {
      content: Array
    }
  }
</script>

<style scoped lang="scss">
  div#ContentTabPanelPhp {
    background-color:$primary-color;
    width:100%;
    height:100%;
    left:0;
    top:0;
    overflow:scroll;
  }
</style>
