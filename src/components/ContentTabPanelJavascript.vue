<template>
  <div id="ContentTabPanelJavascript">
    <editor-ace type="javascript" :panelId="panelId"/>
  </div>
</template>

<script>
  import EditorAce from './EditorAce'
  export default {
    name: 'ContentTabPanelJavascript',
    components: { EditorAce },
    props: {
      panelId: {
        type: String,
        required: true
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
    overflow:hidden;
  }
</style>
