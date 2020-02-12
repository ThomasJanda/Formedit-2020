<template>
  <div id="ContentTabPanelPhp">
    <pre data-mode="php">{{ code }}</pre>
  </div>
</template>

<script>
  export default {
    name: 'ContentTabPanelPhp',
    props: {
      panelId: {
        type: String,
        required: true
      },
      code: {
        type: String,
        default: ''
      }
    }

  }
</script>

<style scoped lang="scss">
  div#ContentTabPanelPhp {
    background-color:black;
    width:100%;
    height:100%;
    left:0;
    top:0;
    overflow:scroll;
  }
</style>
