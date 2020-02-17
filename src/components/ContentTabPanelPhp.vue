<template>
  <div id="ContentTabPanelPhp">
    <editor-ace type="html" :panelId="panelId"/>
  </div>
</template>

<script>
  import EditorAce from './EditorAce'
  export default {
    name: 'ContentTabPanelPhp',
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
  div#ContentTabPanelPhp {
    background-color:black;
    width:100%;
    height:100%;
    left:0;
    top:0;
    overflow:hidden;
  }
</style>
