<template>
  <div class="element"
       :style="getStyle()"
       draggable="true"
       @dragstart="drag"
       :data-id="element.standard.id"
       :data-type="element.standard.type"
  >
    {{ element.editor.panel.title }}
    <content-tab-panel-form-element v-for="element in this.getElements" :idPanel="idPanel" :element="element" :key="element.standard.id"/>
  </div>
</template>

<script>
  export default {
    name: 'ContentTabPanelFormElement',
    props: {
      idPanel: {
        type: String,
        required: true
      },
      element: {
        type: Object,
        required: true
      }
    },
    computed:
    {
      getElements() {
        return this.$store.getters.editorProjectPanelGetElementsAssignedElement(this.element.standard.id)
      }
    },
    methods: {
      drag(event) {
        let data = {
          type: 'move',
          id: this.element.standard.id,
          elementX: event.layerX,
          elementY: event.layerY
        }
        let json = JSON.stringify(data)
        event.dataTransfer.setData("text", json)
      },
      getStyle()
      {
        return {
          position: this.element.standard.position.type,
          left: this.element.standard.position.absolute.left + "px",
          top: this.element.standard.position.absolute.top + "px",
          width: this.element.standard.position.absolute.width + "px",
          height: this.element.standard.position.absolute.height + "px",
          backgroundColor: this.element.editor.panel.backgroundColor,
          color: this.element.editor.panel.foregroundColor
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  div.element
  {
    background-color:blue;
    border:1px solid black;
    cursor:move;
    position:relative;
  }
</style>
