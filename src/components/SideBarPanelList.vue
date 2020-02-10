<template>
  <div id="SideBarFromList">
    <select @change="change">
      <option v-for="panel in list" :selected="panel.properties.id === selected" :value="panel.properties.id" :key="panel.properties.id" >
        {{ panel.properties.title }}
      </option>
    </select>
  </div>
</template>

<script>

  export default {
    name: 'SideBarPanelList',
    data: function() {
      return {
      }
    },
    methods: {
      change (event) {
        this.$store.dispatch('editorProjectSetPanelSelected',{panelId: event.target.value})
      }
    },
    computed:
    {
      list()
      {
        return this.$store.getters.editorProjectGetPanels
      },
      selected() {
        return this.$store.getters.editorProjectGetPanelSelectedId
      }
    }
  }
</script>

<style scoped lang="scss">
  div#SideBarFromList
  {
    select
    {
      width:100%;
    }
  }
</style>
