<template>
  <div ref="element"
       class="element"
       :class="{ selected: isSelected }"
       :style="getStyle()"
       :data-id="element.standard.id"
       :data-type="element.standard.type"
       @click.stop="click"
  >
    <div class="mover"
         draggable="true"
         @dragstart.stop="dragMover"
         @click.self="clickMover"
         @mousemove.self="mousemoveMover"
         @mousedown.self="mousedownMover"
         @mouseup.self="mouseupMover"
    ></div>
    {{ element.editor.panel.title }}
    <div class="sizer"
         draggable="true"
         @dragstart.stop="dragSizer"
         @click.self="clickSizer"
         @mousemove.self="mousemoveSizer"
         @mousedown.self="mousedownSizer"
         @mouseup.self="mouseupSizer"
    ></div>
    <content-tab-panel-form-element
      v-for="element in this.getElements"
      :panelId="panelId"
      :element="element"
      :key="element.standard.id"
      @setsizerrect="setSizerRect"
      @setmoverrect="setMoverRect"
    />
  </div>
</template>

<script>
  import panel from './../shared/panel'
  import utils from '../shared/utils'
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
      dragMover(event) {

        let c = utils.absoluteLeftTopToPanel(this.$refs.element, this.panelId)
        let rect = {
          left: c.left,
          top: c.top,
          width: this.$refs.element.offsetWidth,
          height: this.$refs.element.offsetHeight,
          elClickLeft: (event.layerX + 10),
          elClickTop: (event.layerY + 10)
        }
        this.$emit('setmoverrect', rect)

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

        let c = utils.absoluteLeftTopToPanel(this.$refs.element, this.panelId)
        let rect = {
          x1: c.left,
          y1: c.top,
          x2: c.left + this.$refs.element.offsetWidth,
          y2: c.top + this.$refs.element.offsetHeight,
          elClickLeft: event.layerX,
          elClickTop: event.layerY,
          elWidth: event.srcElement.offsetWidth,
          elHeight: event.srcElement.offsetHeight
        }
        this.$emit('setsizerrect', rect)

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
        /*
        this.$store.dispatch('editorProjectPanelClearElementSelected', { panelId: this.panelId }).then(() => {
          this.$store.dispatch('editorProjectPanelSetElementSelected', { panelId: this.panelId, elementId: this.element.standard.id })
        })
         */
      },
      clickMover() {
        this.$emit('clickMover')
      },
      mousemoveMover() {
        this.$emit('mousemoveMover')
      },
      mousedownMover() {
        this.$emit('mousedownMover')
      },
      mouseupMover() {
        this.$emit('mouseupMover')
      },
      clickSizer() {
        this.$emit('clickSizer')
      },
      mousemoveSizer() {
        this.$emit('mousemoveSizer')
      },
      mousedownSizer() {
        this.$emit('mousedownSizer')
      },
      mouseupSizer() {
        this.$emit('mouseupSizer')
      },
      setSizerRect(rect) {
        this.$emit('setsizerrect', rect)
      },
      setMoverRect(rect) {
        this.$emit('setmoverrect', rect)
      }
    }
  }
</script>

<style scoped lang="scss">
  div.element
  {
    border:1px solid black;
    position:relative;
    padding: 5px 0 0 10px;

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
    > div.mover
    {
      position:absolute;
      left:0px;
      top:0px;
      width:10px;
      height:10px;
      background:url('../assets/elementMove.png');
      cursor: move;
    }
  }
</style>
