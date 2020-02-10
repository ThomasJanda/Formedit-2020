<template>
    <div class="SideBarElementList">
      <!--<sidebarelementlistitem
        :key="element.elementId"
        v-for="element in elementList"
        v-bind:elementId="element.elementId"
        v-bind:title="element.title"
        v-on:clickElement="clickElement"
      ></sidebarelementlistitem>
      <div v-if="elementList.length===0">No Elements present</div>
      -->
      <side-bar-element-list-group v-for="elementGroupName in elementGroupNames()" :title="elementGroupName" :key="elementGroupName" />
    </div>
</template>

<script>
  import SideBarElementListGroup  from './SideBarElementListGroup'

  export default {
    name: 'SideBarElementList',
    components: {
      SideBarElementListGroup
    },
    data() {
      return {
      }
    },
    props: {
    },
    methods: {
      elementGroupNames() {
        return this.$store.getters.editorSideBarGroups
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
