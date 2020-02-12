<template>
    <div class="SideBarElementGroupListItem"
         draggable="true"
         :style="getStyle()"
         @click="click"
         @dragstart="drag"
    >
      <span>{{ element.editor.sideBar.title }}</span>
    </div>
</template>

<script>
  export default {
    name: 'SideBarElementGroupListItem',
    props: {
      element: Object
    },
    methods: {
      getStyle() {
        let element = this.element
        return {
          backgroundColor: element.editor.sideBar.backgroundColor,
          color: element.editor.sideBar.foregroundColor
        }
      },
      click() {
        this.$emit('clickElement', this.elementId)
      },
      drag(event)
      {
        let iLeft = event.layerX - event.srcElement.offsetLeft
        let iTop = event.layerY - event.srcElement.offsetTop

        let data = {
          type: 'new',
          elementId: this.element.standard.elementId,
          elementX: iLeft,
          elementY: iTop
        }
        let json = JSON.stringify(data)
        event.dataTransfer.setData("text", json)
      }
    }
  }
</script>

<style scoped lang="scss">
  div.SideBarElementGroupListItem
  {
    border:1px solid $secondary-background-color;
    background-color:$secondary-background-color;
    color:$primary-color;
    cursor:move;
    line-height:20px;
    padding:5px 10px 5px 10px;
  }
  div.SideBarElementGroupListItem:hover
  {
    background-color:$secondary-background-color;
  }
</style>
