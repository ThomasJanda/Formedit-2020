<template>
  <div id="ContentTabPanelForm" @drop="this.drop" @dragover="this.dragover">
    <content-tab-panel-form-element v-for="element in this.getElements()" :idForm="id" :idElement="element.id" :key="element.id"></content-tab-panel-form-element>
  </div>
</template>

<script>
  import store from '../../store/index'
  import ContentTabPanelFormElement from './ContentTabPanelFormElement'

  export default {
    name: 'ContentTabPanelForm',
    components: {
      ContentTabPanelFormElement
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    methods: {
      drop(event) {
        event.preventDefault()

        let json = event.dataTransfer.getData("text")
        let data = JSON.parse(json)
        let elementId = data.id
        let iLeft = event.layerX
        let iTop = event.layerY

        let payload = {
          idForm: this.idForm,
          element: {
            id: elementId,
            position: 'absolute',
            positionAbsoluteLeft: iLeft,
            positionAbsoluteTop: iTop,
            positionAbsoluteWidth: 200,
            positionAbsoluteHeight: 25
          }
        }
        store.commit('addFormElement', payload)
        //event.target.appendChild(document.getElementById(data))
      },
      dragover(event) {
        event.preventDefault()
      },


      getForm: function() {
        let id = this.id
        return store.getters.getForm(id)
      },
      getElements: function()
      {
        let form = this.getForm()
        return form.elements
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
