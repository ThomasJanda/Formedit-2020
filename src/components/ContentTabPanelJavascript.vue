<template>
  <div id="ContentTabPanelJavascript">
    <pre data-mode="javascript">{{ code }}</pre>
  </div>
</template>

<script>
  export default {
    name: 'ContentTabPanelJavascript',
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
  div#ContentTabPanelJavascript {
    background-color:black;
    width:100%;
    height:100%;
    left:0;
    top:0;
    overflow:scroll;
  }
</style>
