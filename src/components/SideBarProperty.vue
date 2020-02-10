<template>
  <div id="sideBarRight">
    <sidebartitle v-bind:title="this.sideBarTitle" @reload="sideBarRightReload"></sidebartitle>
  </div>
</template>

<script>
  import SideBarTitle from './SideBarTitle'

  export default {
    name: 'SideBarProperty',
    components: {
      sidebartitle: SideBarTitle
    },
    data: function() {
      return {
        sideBarTitle: 'Properties'
      }
    },
    computed: {
    },
    methods: {
      sideBarRightReload () {
        this.$emit('sideBarReload')
      }
    }
  }
</script>

<style scoped lang="scss">
  div#sideBarRight
  {
    width:100%;
    height:100%;
    background-color:orange;
    overflow-y:scroll;
  }
</style>
