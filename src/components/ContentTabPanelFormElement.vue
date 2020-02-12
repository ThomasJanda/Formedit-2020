<template>
  <div class="element"
       :class="{ selected: isSelected }"
       draggable="true"
       :style="getStyle()"
       :data-id="element.standard.id"
       :data-type="element.standard.type"
       @dragstart.stop="drag"
       @click.stop="click"
  >
    {{ element.editor.panel.title }}
    <div class="sizer"
         draggable="true"
         @dragstart.stop="dragSizer"
    ></div>
    <content-tab-panel-form-element
      v-for="element in this.getElements"
      :panelId="panelId"
      :element="element"
      :key="element.standard.id"
    />
  </div>
</template>

<script>
  import panel from './../shared/panel'

  export default {
    name: 'ContentTabPanelFormElement',
    props: {
      panelId: {
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
        return this.$store.getters.editorProjectPanelGetElementsAssignedElement(this.panelId, this.element.standard.id)
      },
      isSelected() {
        return this.$store.getters.editorProjectPanelIsElementSelected(this.panelId, this.element.standard.id)
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
      dragSizer(event) {
        this.$log(event)
        let data = {
          type: 'resize',
          id: this.element.standard.id,
          elementX: event.layerX,
          elementY: event.layerY
        }
        let json = JSON.stringify(data)
        event.dataTransfer.setData("text", json)
      },
      resize(el) {
        let width = parseInt(el.style.width)
        let height = parseInt(el.style.height)
        width = panel.snap(width, 10)
        height = panel.snap(height, 10)
        this.$store.dispatch('editorProjectPanelResizeElement', { panelId: this.panelId, elementId: this.element.standard.id, width: width, height:height })
      },
      getStyle() {
        return {
          position: this.element.standard.position.type,
          left: this.element.standard.position.absolute.left + "px",
          top: this.element.standard.position.absolute.top + "px",
          width: this.element.standard.position.absolute.width + "px",
          height: this.element.standard.position.absolute.height + "px",
          backgroundColor: this.element.editor.panel.backgroundColor,
          color: this.element.editor.panel.foregroundColor
        }
      },
      click() {
        this.$store.dispatch('editorProjectPanelClearElementSelected', { panelId: this.panelId }).then(() => {
          this.$store.dispatch('editorProjectPanelSetElementSelected', { panelId: this.panelId, elementId: this.element.standard.id })
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  div.element
  {
    border:1px solid black;
    cursor:move;
    position:relative;

    &[data-type="container"]
    {
      background:white url('../assets/panelBackground.png');
    }

    &.selected
    {
      background-color:yellow !important;
    }

    > div.sizer
    {
      position:absolute;
      right:0;
      bottom:0;
      width:10px;
      height:10px;
      background:url('../assets/elementGrip.png');
      cursor: nwse-resize;
    }
  }
</style>
