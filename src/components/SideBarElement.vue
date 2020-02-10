<template>
  <div id="sideBarElement">
    <side-bar-title title="Forms" @reload="sideBarLeftReload"></side-bar-title>
    <side-bar-panel-list/>
    <side-bar-title title="Elements" @reload="sideBarLeftReload"></side-bar-title>
    <side-bar-element-list />
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
      }
    },
    methods: {
      sideBarLeftReload () {
        this.$emit('sideBarReload')
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
