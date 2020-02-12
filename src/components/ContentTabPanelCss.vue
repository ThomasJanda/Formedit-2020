<template>
  <div id="ContentTabPanelCss">
    <editor-ace mode="css" @save="save">
        {{ code }}
    </editor-ace>
  </div>
</template>

<script>
  import EditorAce from './EditorAce'
  export default {
    name: 'ContentTabPanelCss',
    components: { EditorAce },
    props: {
      panelId: {
        type: String,
        required: true
      }
    },
    data: () => {
      return {
        code: ''
      }
    },
    methods: {
      save(code) {
        this.code = code
      }
    }
  }
</script>

<style scoped lang="scss">
  div#ContentTabPanelCss {
    background-color:black;
    width:100%;
    height:100%;
    left:0;
    top:0;
    overflow:scroll;
  }
</style>
