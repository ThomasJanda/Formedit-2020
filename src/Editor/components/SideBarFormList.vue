<template>
  <div id="SideBarFromList">
    <select @change="change">
      <option v-for="form in list" :selected="form.id === selected" :value="form.id" :key="form.id" >
        {{ form.title }}
      </option>
    </select>
  </div>
</template>

<script>
  import store from '../../store/index'
  export default {
    name: 'SideBarFormList',
    data: function() {
      return {
      }
    },
    computed: {
      list() {
        return store.state.form.list
      },
      selected () {
        return store.state.form.selected
      }
    },
    methods: {
      change(event) {
        store.commit('setFormSelected',event.target.value)
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
