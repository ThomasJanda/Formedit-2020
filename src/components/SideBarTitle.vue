<template>
  <div class="flexbox">
    <div class="title">{{ title }}</div>
    <div class="search">
      <div v-if="this.showSearch">
        <input type="text" value="" placeholder="Search..." v-model.trim="search" >
      </div>
    </div>
    <div class="reload" v-if="this.showReload"><button type="button" @click="clickReload">&#8634;</button></div>
  </div>
</template>

<script>
  export default {
    name: 'SideBarTitle',
    props: {
      title: String,
      showReload: {
        type: Boolean,
        default: true
      },
      showSearch: {
        type: Boolean,
        default: true
      },
    },
    data: () => {
      return {
        search:''
      }
    },
    methods: {
      clickReload () {
        this.$emit('reload')
      }
    },
    watch: {
      search()
      {
        this.$emit('search',this.search)
      }
    }
  }
</script>

<style scoped lang="scss">
  div.flexbox {
    display: flex;
    height:25px;
    line-height:25px;
    vertical-align: middle;
    background-color:$secondary-background-color;
    position:sticky;
    top:0px;
    div.title
    {
      padding-left:5px;
    }
    div.search
    {
      flex:auto;
      div {
        margin-left:5px;
        input {
          width:100%;
          box-sizing: border-box;
        }
      }
    }
    div.reload
    {
      button
      {
        width:23px;
        height:23px;
        line-height:23px
      }
      margin-left:5px;
    }
  }
</style>
