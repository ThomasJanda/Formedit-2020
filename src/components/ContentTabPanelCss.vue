<template>
  <div id="ContentTabPanelCss"></div>
</template>

<script>
  export default {
    name: 'ContentTabPanelCss',
    props: {
      panelId: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  div#ContentTabPanelCss {
    background-color:$primary-color;
    width:100%;
    height:100%;
    left:0;
    top:0;
    overflow:scroll;
  }
</style>
