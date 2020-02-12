<template>
  <div id="sideBarElement">
    <side-bar-title title="Forms" :show-reload="false" :show-search="false"></side-bar-title>
    <side-bar-panel-list/>
    <side-bar-title title="Elements" @search="elementSearch" :show-reload="false" :show-search="true"></side-bar-title>
    <side-bar-element-list :search="elementListSearch"/>
  </div>
</template>

<script>
  import SideBarElementList from './SideBarElementList'
  import SideBarTitle from './SideBarTitle'
  import SideBarPanelList from './SideBarPanelList'

  export default {
    name: 'SideBarElement',
    components: {
      SideBarElementList,
      SideBarTitle,
      SideBarPanelList
    },
    data: function () {
      return {
        elementListSearch: ''
      }
    },
    methods: {
      sideBarLeftReload () {
        this.$emit('sideBarReload')
      },
      elementSearch(value) {
        this.elementListSearch = value
      }
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  div#sideBarElement {
    width:100%;
    height: 100%;
    background-color: orange;
    overflow-y: scroll;
  }
</style>
