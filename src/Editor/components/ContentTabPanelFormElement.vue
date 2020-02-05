<template>
  <div class="element" :style="getStyle()">{{ idForm}} {{ idElement }}</div>
</template>

<script>
  import store from '../../store/index'

  export default {
    name: 'ContentTabPanelFormElement',
    props: {
      idForm: {
        type: String
      },
      idElement: {
        type: String
      }
    },
    methods: {
      getElement()
      {
        let idForm = this.idForm
        let idElement = this.idElement
        return store.getters.getElement(idForm, idElement)
      },
      getStyle()
      {
        let element = this.getElement()
        return {
          position: element.position,
          left: element.positionAbsoluteLeft + "px",
          top: element.positionAbsoluteTop + "px",
          width: element.positionAbsoluteWidth + "px",
          height: element.positionAbsoluteHeight + "px"
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
  }
</style>
