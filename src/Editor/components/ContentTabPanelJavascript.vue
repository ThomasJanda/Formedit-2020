<template>
  <div id="ContentTabPanelJavascript"></div>
</template>

<script>
  export default {
    name: 'ContentTabPanelJavascript',
    props: {
      content: Array
    }
  }
</script>

<style scoped lang="scss">
  div#ContentTabPanelJavascript {
    background-color:$primary-color;
    width:100%;
    height:100%;
    left:0;
    top:0;
    overflow:scroll;
  }
</style>
