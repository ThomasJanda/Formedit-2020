<template>
  <div id="ContentTabPanelForm"
       @drop="this.drop"
       @dragover="this.dragover"
       :data-id="panelId"
       data-type="container"
  >
    <content-tab-panel-form-element v-for="element in this.getElements" :idPanel="panelId" :element="element" :key="element.standard.id"/>
  </div>
</template>

<script>
  import ContentTabPanelFormElement from './ContentTabPanelFormElement'
  import utils from '../shared/utils'
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

        let json = event.dataTransfer.getData("text")
        let data = JSON.parse(json)
        let type = data.type
        //let elementX = data.elementX
        //let elementY = data.elementY

        //let parentElement = event.target
        this.$log(event)


        let iLeft = event.layerX // - elementX
        let iTop = event.layerY  // - elementY
        //implement snap

        this.$log(type)
        this.$log(iLeft)
        this.$log(iTop)

        if(type==="new")
        {
          this.$log('donew')
          let elementId = data.elementId
          let oElement = this.$store.getters.editorSideBarGetElement(elementId)
          oElement = JSON.parse(JSON.stringify(oElement)) //to loss reaction
          oElement.standard.id = utils.uniqid()
          this.$log(oElement.standard.id)
          oElement.standard.parentId=this.panelId
          oElement.standard.position.type="absolute"
          oElement.standard.position.absolute.left=iLeft
          oElement.standard.position.absolute.top=iTop

          this.$store.dispatch('editorProjectPanelAddElement', {panelId: this.panelId, element: oElement} )
        }
        else if(type==="move")
        {
          this.$log('domove')
          let id = data.id
          let oElement = this.$store.getters.editorProjectPanelGetElement(this.panelId, id)
          oElement.standard.position.absolute.left = iLeft
          oElement.standard.position.absolute.top = iTop
        }
      },
      dragover(event) {
        event.preventDefault()
      }
    },
    computed: {
      getPanel() {
        return this.$store.getters.editorProjectGetPanel(this.panelId)
      },
      getElements() {
        return this.$store.getters.editorProjectPanelGetElementsAssignedPanel(this.panelId)
      }
    }
  }
</script>

<style scoped lang="scss">
  div#ContentTabPanelForm {
    position:relative;
    background-color: lightyellow;
    color:black;
    width:100%;
    height:100%;
    left:0;
    top:0;
    overflow:scroll;
  }
</style>
