<template>
  <div id="sideBarRight">
    <side-bar-title v-bind:title="this.sideBarTitle" @reload="sideBarRightReload"></side-bar-title>
    <div>
      <div v-for="id in getElementsSelected" :key="id">
        {{ id }}
      </div>
    </div>
    <!--
    <div v-if="getElementSelected">
      <side-bar-property-list :object="getElementSelected.editor" :panel-id="panelId" :element-id="getElementSelected.standard.id"></side-bar-property-list>
      <side-bar-property-list :object="getElementSelected.standard" :panel-id="panelId" :element-id="getElementSelected.standard.id"></side-bar-property-list>
    </div>
    -->
  </div>
</template>

<script>
  import SideBarTitle from './SideBarTitle'
  /* import SideBarPropertyList from './SideBarPropertyList' */

  export default {
    name: 'SideBarProperty',
    components: {
      /*SideBarPropertyList,*/
      SideBarTitle
    },
    props: {
      panelId: {
        type:String,
        required: true
      }
    },
    data: function() {
      return {
        sideBarTitle: 'Properties'
      }
    },
    computed: {
      getElementsSelected()
      {
        return this.$store.getters.editorProjectPanelGetElementsSelected(this.panelId)
      }
      /*
      getElementSelected() {
        return this.$store.getters.editorProjectPanelGetElementSelected(this.panelId)
      }
      */
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
