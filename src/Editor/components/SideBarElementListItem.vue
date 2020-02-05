<template>
  <div class="element">
    <div v-bind:id="elementId" @click="clickElement" draggable="true" @dragstart="this.drag">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SideBarElementListItem',
    props: {
      elementId: [String, Number],
      title: String
    },
    methods: {
      clickElement() {
        this.$emit('clickElement', this.elementId)
      },
      drag(event)
      {
        let data = {
          id: this.elementId
        }
        let json = JSON.stringify(data)
        event.dataTransfer.setData("text", json)
      }
    }
  }
</script>

<style scoped lang="scss">
  div.element
  {
    border:1px solid $secondary-background-color;
    background-color:$primary-background-color;
    color:$primary-color;
    cursor:move;
    line-height:20px;
    padding:5px 10px 5px 10px;
  }
  div.element:hover
  {
    background-color:$secondary-background-color;
  }
</style>
