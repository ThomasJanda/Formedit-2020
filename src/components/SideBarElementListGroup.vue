<template>
  <div class="sideBarElementListGroup">
    <div class="title" @click="clickTitle" >
      {{ title }}
    </div>
    <div class="elements" v-bind:class="getState">
      <side-bar-element-list-group-item v-for="element in elements()" :key="element.standard.elementId" :element="element"></side-bar-element-list-group-item>
    </div>
  </div>
</template>

<script>
  import SideBarElementListGroupItem from './SideBarElementListGroupItem'

  export default {
    name: 'SideBarElementListGroup',
    components: {
      SideBarElementListGroupItem
    },
    data: () => {
      return {
        state: 'close'
      }
    },
    props: {
      title: {
        type: String,
        required: true
      },
      search: {
        data: String,
        default: ''
      }
    },
    methods:
    {
      elements() {
        return this.$store.getters.editorSideBarElementsFromGroup(this.title, this.search)
      },
      clickTitle() {
        this.state = this.state==="open"?"close":"open"
      },
    },
    computed: {
      getState() {
        let state = this.state
        if(this.search!=="")
          state='open'
        return state
      }
    }
  }
</script>

<style scoped lang="scss">
  div.sideBarElementListGroup
  {
    div.title
    {
      border:1px solid $secondary-background-color;
      background-color:$secondary-background-color;
      color:$primary-color;
      cursor:pointer;
      line-height:20px;
      padding:5px 10px 5px 10px;

      &:hover
      {
        background-color:$primary-background-color;
      }
    }
    div.elements
    {
      display:none;
      &.open
      {
        display:block;
      }
    }
  }
</style>
