<template>
  <div id="sideBarElement">
    <side-bar-title title="Forms" @reload="sideBarLeftReload"></side-bar-title>
    <side-bar-form-list/>
    <side-bar-title title="Elements" @reload="sideBarLeftReload"></side-bar-title>
    <side-bar-element-list v-bind:elementlist="this.elementList"></side-bar-element-list>
  </div>
</template>

<script>
  import SideBarElementList from './SideBarElementList'
  import SideBarTitle from './SideBarTitle'
  import SideBarFormList from './SideBarFormList'
  import store from '../../store/index'

  export default {
    name: 'SideBarElement',
    components: {
      SideBarElementList,
      SideBarTitle,
      SideBarFormList
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
      elementList: () => {
        return store.state.elementList
      }
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
