<template>
  <div id="ContentTabPanelForm"
       data-type="container"
       @click="click"
       @drop="this.drop"
       @dragover="this.dragover"
       :data-id="panelId"
       :style="getStyle"
  >
    <content-tab-panel-form-element
      v-for="element in this.getElements"
      :panelId="panelId"
      :element="element"
      :key="element.standard.id"
    />
  </div>
</template>

<script>
  import ContentTabPanelFormElement from './ContentTabPanelFormElement'
  //import utils from '../shared/utils'
  import panel from '../shared/panel'
  export default {
    name: 'ContentTabPanelForm',
    components: {
      ContentTabPanelFormElement
    },
    props: {
      panelId: {
        type: String,
        required: true
      }
    },
    methods: {
      drop(event) {
        event.preventDefault()
        panel.drop(this,event)
      },
      dragover(event) {
        event.preventDefault()
      },
      click() {
        this.$store.dispatch('editorProjectPanelClearElementSelected', { panelId: this.panelId })
      }
    },
    computed: {
      getPanel() {
        return this.$store.getters.editorProjectGetPanel(this.panelId)
      },
      getElements() {
        return this.$store.getters.editorProjectPanelGetElementsAssignedPanel(this.panelId)
      },
      getStyle() {
        let panel = this.getPanel
        if(panel)
        {
          return {
            width: this.getPanel.editor.width,
            height: this.getPanel.editor.height
          }
        }
        return {}
      }
    }
  }
</script>

<style scoped lang="scss">
  div#ContentTabPanelForm {
    position:relative;
    color:black;
    left:0;
    top:0;
    overflow:hidden;
    background:white url('../assets/panelBackground.png');
  }
</style>
