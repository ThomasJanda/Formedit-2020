<template>
    <div class="SideBarElementList">
      <sidebarelementlistitem
        :key="element.id"
        v-for="element in elementList"
        v-bind:elementId="element.id"
        v-bind:title="element.title"
        v-on:clickElement="clickElement"
      ></sidebarelementlistitem>
      <div v-if="elementList.length===0">No Elements present</div>
    </div>
</template>

<script>
  import SideBarElementListItem from './SideBarElementListItem'
  export default {
    name: 'SideBarElementList',
    components: {
      sidebarelementlistitem: SideBarElementListItem
    },
    data() {
      return {
        elementList: this.elementlist
      }
    },
    props: {
      elementlist: {
        type: Array
      }
    },
    methods: {
      clickElement(elementId) {
        alert(elementId)
      }
    }
  }
</script>


<style scoped lang="scss">
  div.SideBarElementList
  {
    border:1px solid $secondary-background-color;
    background-color:$primary-background-color;
  }
</style>
