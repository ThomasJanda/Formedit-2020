<template>
  <div id="ContentTabPanelForm"
       data-type="container"
       @click="click"
       @mousedown="mousedown"
       @mouseup="mouseup"
       @mousemove="mousemove"
       @drop="this.drop"
       @dragover="this.dragover"
       :data-id="panelId"
       :style="getStyle"
  >
    <div class="sizer top" :style="getStyleSizerTop"></div>
    <div class="sizer bottom" :style="getStyleSizerBottom"></div>
    <div class="sizer left" :style="getStyleSizerLeft"></div>
    <div class="sizer right" :style="getStyleSizerRight"></div>

    <content-tab-panel-form-element
      v-for="element in this.getElements"
      :panelId="panelId"
      :element="element"
      :key="element.standard.id"
      @setsizerrect="setSizerRect"
      @setmoverrect="setMoverRect"
      @mousedownMover="mousedownMover"
      @mouseupMover="mouseupMover"
      @mousedownSizer="mousedownSizer"
      @mouseupSizer="mouseupSizer"
    />
  </div>
</template>

<script>
  import ContentTabPanelFormElement from './ContentTabPanelFormElement'
  import utils from '../shared/utils'

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
    data: () => {
      return {
        rectMode:"",
        rectSource: null,
        rectUnified: null
      }
    },
    methods: {
      drop(event) {
        event.preventDefault()
        panel.drop(this,event)
        this.rectMode = ""
        this.calcRectSource()
      },
      dragover(event) {
        event.preventDefault()
        if(this.rectMode==="sizer")
        {
          let c = utils.absoluteLeftTopToPanel(event.target,this.panelId)
          this.rectSource.x2=c.left + event.layerX
          this.rectSource.y2=c.top + event.layerY
          this.calcRectSource()
        }
        else if(this.rectMode==="mover")
        {
          let c = utils.absoluteLeftTopToPanel(event.target,this.panelId)
          this.rectSource.left=c.left + event.layerX
          this.rectSource.top=c.top + event.layerY
          this.calcRectSource()
        }
      },
      click() {
        //this.$store.dispatch('editorProjectPanelClearElementSelected', { panelId: this.panelId })
      },
      setSizerRect(rect) {
        this.rectMode='sizer'
        this.rectSource = rect
        this.calcRectSource()
      },
      setMoverRect(rect) {
        this.rectMode='mover'
        this.rectSource = rect
        this.calcRectSource()
      },
      mousedown(event) {
        if(event.buttons===1) {
          if(this.rectMode==="")
          {
            this.rectMode="select"
            let c = utils.absoluteLeftTopToPanel(event.target,this.panelId)
            let parentId = utils.findFirstParentContainer(this, event.target)
            let cAbsolute = utils.absoluteLeftTopToPanel(event.target,this.panelId)

            this.rectSource = {
              x1:c.left + event.layerX,
              y1:c.top + event.layerY,
              x2:c.left + event.layerX,
              y2:c.top + event.layerY,
              parentId: parentId,
              parentLeft: cAbsolute.left,
              parentTop: cAbsolute.top
            }
            this.calcRectSource()
          }
        }
      },
      mousemove(event) {
        if(event.buttons===1 && this.rectMode==="select") {
          let c = utils.absoluteLeftTopToPanel(event.target,this.panelId)
          this.rectSource.x2=c.left + event.layerX
          this.rectSource.y2=c.top + event.layerY
          this.calcRectSource()

          let x1 = (this.rectSource.x1 < this.rectSource.x2 ? this.rectSource.x1: this.rectSource.x2)
          let x2 = (this.rectSource.x1 >= this.rectSource.x2 ? this.rectSource.x1: this.rectSource.x2)
          let y1 = (this.rectSource.y1 < this.rectSource.y2 ? this.rectSource.y1: this.rectSource.y2)
          let y2 = (this.rectSource.y1 >= this.rectSource.y2 ? this.rectSource.y1: this.rectSource.y2)

          let selectedElementIds = []
          let selectedElements = panel.findElementsInRect(this,
            this.rectSource.parentId,
            this.rectSource.parentLeft,
            this.rectSource.parentTop, x1, y1, x2 - x1, y2 - y1)
          if(selectedElements)
          {
            for(let i=0;i<selectedElements.length;i++)
            {
              selectedElementIds.push(selectedElements[i].standard.id)
            }
          }
          this.$store.dispatch('editorProjectPanelSetElementsSelected', { panelId: this.panelId, elementIds: selectedElementIds })
        }
      },
      mouseup(event) {
        this.rectMode=""
        this.rectUnified=null
      },
      calcRectSource() {
        let o = {
          display: false,
          left: {},
          top: {},
          right: {},
          bottom: {}
        }
        if(this.rectMode==="sizer" && this.rectSource!==null)
        {
          o.display=true
          o.left = {
            left: this.rectSource.x1 + "px",
            width: '0px',
            top: this.rectSource.y1 + "px",
            height: utils.snap(this.rectSource.y2 - this.rectSource.y1 + this.rectSource.elHeight - this.rectSource.elClickTop) + "px"
          }
          o.top = {
            left: this.rectSource.x1 + "px",
            width: utils.snap(this.rectSource.x2 - this.rectSource.x1 + this.rectSource.elWidth - this.rectSource.elClickLeft) + "px",
            top: this.rectSource.y1 + "px",
            height: "0px"
          }
          o.right = {
            left: (this.rectSource.x1 + utils.snap(this.rectSource.x2 - this.rectSource.x1 + this.rectSource.elWidth - this.rectSource.elClickLeft)) + "px",
            width: "0px",
            top: this.rectSource.y1 + "px",
            height: utils.snap(this.rectSource.y2 - this.rectSource.y1 + this.rectSource.elHeight - this.rectSource.elClickTop) + "px"
          }
          o.bottom = {
            left: this.rectSource.x1 + "px",
            width: utils.snap(this.rectSource.x2 - this.rectSource.x1 + this.rectSource.elWidth - this.rectSource.elClickLeft) + "px",
            top: (this.rectSource.y1 + utils.snap(this.rectSource.y2 - this.rectSource.y1 + this.rectSource.elHeight - this.rectSource.elClickTop)) + "px",
            height: "0px"
          }
        }
        else if(this.rectMode==="mover" && this.rectSource!==null)
        {
          o.display=true
          o.left = {
            left: utils.snap(this.rectSource.left - this.rectSource.elClickLeft) + "px",
            width: '0px',
            top: utils.snap(this.rectSource.top - this.rectSource.elClickTop) + "px",
            height: this.rectSource.height + "px"
          }
          o.top = {
            left: utils.snap(this.rectSource.left - this.rectSource.elClickLeft) + "px",
            width: this.rectSource.width + "px",
            top: utils.snap(this.rectSource.top - this.rectSource.elClickTop) + "px",
            height: '0px'
          }
          o.right = {
            left: (utils.snap(this.rectSource.left - this.rectSource.elClickLeft) + this.rectSource.width) + "px",
            width: "0px",
            top: utils.snap(this.rectSource.top - this.rectSource.elClickTop) + "px",
            height: this.rectSource.height + "px"
          }
          o.bottom = {
            left: utils.snap(this.rectSource.left - this.rectSource.elClickLeft) + "px",
            width: this.rectSource.width + "px",
            top: (utils.snap(this.rectSource.top - this.rectSource.elClickTop) + this.rectSource.height) + "px",
            height: '0px'
          }
        }
        else if(this.rectMode==="select" && this.rectSource!==null)
        {
          let x1 = (this.rectSource.x1 < this.rectSource.x2 ? this.rectSource.x1: this.rectSource.x2)
          let x2 = (this.rectSource.x1 >= this.rectSource.x2 ? this.rectSource.x1: this.rectSource.x2)
          let y1 = (this.rectSource.y1 < this.rectSource.y2 ? this.rectSource.y1: this.rectSource.y2)
          let y2 = (this.rectSource.y1 >= this.rectSource.y2 ? this.rectSource.y1: this.rectSource.y2)

          o.display=true
          o.left = {
            left: x1 + "px",
            width: '0px',
            top: y1 + "px",
            height: (y2 - y1) + "px"
          }
          o.top = {
            left: x1 + "px",
            width: (x2 - x1) + "px",
            top: y1 + "px",
            height: '0px'
          }
          o.right = {
            left: (x1 + (x2 - x1)) + "px",
            width: "0px",
            top: y1 + "px",
            height: (y2 - y1) + "px"
          }
          o.bottom = {
            left: x1 + "px",
            width: (x2 - x1) + "px",
            top: (y1 + (y2 - y1)) + "px",
            height: '0px'
          }
        }
        this.rectUnified = o
      },

      mousedownMover() {
        this.rectMode = "mover"
      },
      mouseupMover() {
        this.rectMode = ""
      },
      mousedownSizer() {
        this.rectMode = "sizer"
      },
      mouseupSizer() {
        this.rectMode = ""
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
      },
      getStyleSizerTop() {
        let o = {
          display:'none'
        }
        if(this.rectUnified!==null && this.rectUnified.display)
        {
          o.display = 'block'
          o.left = this.rectUnified.top.left
          o.top = this.rectUnified.top.top
          o.width = this.rectUnified.top.width
          o.height = this.rectUnified.top.height
        }
        return o
      },
      getStyleSizerRight() {
        let o = {
          display:'none'
        }
        if(this.rectUnified!==null && this.rectUnified.display)
        {
          o.display = 'block'
          o.left = this.rectUnified.right.left
          o.top = this.rectUnified.right.top
          o.width = this.rectUnified.right.width
          o.height = this.rectUnified.right.height
        }
        return o
      },
      getStyleSizerBottom() {
        let o = {
          display:'none'
        }
        if(this.rectUnified!==null && this.rectUnified.display)
        {
          o.display = 'block'
          o.left = this.rectUnified.bottom.left
          o.top = this.rectUnified.bottom.top
          o.width = this.rectUnified.bottom.width
          o.height = this.rectUnified.bottom.height
        }
        return o
      },
      getStyleSizerLeft() {
        let o = {
          display:'none'
        }
        if(this.rectUnified!==null && this.rectUnified.display)
        {
          o.display = 'block'
          o.left = this.rectUnified.left.left
          o.top = this.rectUnified.left.top
          o.width = this.rectUnified.left.width
          o.height = this.rectUnified.left.height
        }
        return o
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
  div.sizer
  {
    display:none;
    position:absolute;
    background:transparent;
    z-index: 1000;
    border:0px solid red;

    &.top
    {
      border-bottom-width: 1px;
    }
    &.right
    {
      border-left-width: 1px;
    }
    &.bottom
    {
      border-top-width: 1px;
    }
    &.left
    {
      border-right-width: 1px;
    }
  }
</style>
