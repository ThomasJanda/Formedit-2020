<template>
  <div id="ContentTab" v-bind:data-id="panelId">
    <div class="header">
      <div v-bind:class="selectedTab==='form' ? 'selected' : '' " @click="tabHeaderClick('form')">Form</div>
      <div v-bind:class="selectedTab==='javascript' ? 'selected' : '' " @click="tabHeaderClick('javascript')">
        Javascript
      </div>
      <div v-bind:class="selectedTab==='php' ? 'selected' : '' " @click="tabHeaderClick('php')">PHP</div>
      <div v-bind:class="selectedTab==='css' ? 'selected' : '' " @click="tabHeaderClick('css')">CSS</div>
    </div>
    <div class="panels">
      <div v-if="selectedTab==='form'">
        <content-tab-panel-form  v-bind:panelId="panelId"/>
      </div>
      <div v-if="selectedTab==='javascript'">
        <content-tab-panel-javascript v-bind:panelId="panelId"/>
      </div>
      <div v-if="selectedTab==='php'">
        <content-tab-panel-php v-bind:panelId="panelId"/>
      </div>
      <div v-if="selectedTab==='css'">
        <content-tab-panel-css v-bind:panelId="panelId"/>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentTabPanelForm from './ContentTabPanelForm'
  import ContentTabPanelJavascript from './ContentTabPanelJavascript'
  import ContentTabPanelPhp from './ContentTabPanelPhp'
  import ContentTabPanelCss from './ContentTabPanelCss'

  export default {
    name: 'ContentTab',
    components: {
      ContentTabPanelCss,
      ContentTabPanelForm,
      ContentTabPanelJavascript,
      ContentTabPanelPhp
    },
    props: {
      panelId: { type: [String, Number] }
    },
    data() {
      return {
        selectedContentTab: "form"
      }
    },
    methods: {
      tabHeaderClick: function (tabId) {
        this.selectedContentTab = tabId
      },
    },
    computed: {
      selectedTab() {
        return this.selectedContentTab
      }
    }
  }
</script>

<style scoped lang="scss">
  div#ContentTab {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    div.header {
      width: 100%;
      height: 25px;
      background-color: $primary-background-color;

      div {
        float: left;
        max-width: 200px;
        line-height: 25px;
        padding: 0 10px;
        vertical-align: middle;
        height: 25px;
        border: 1px solid $primary-color;
        background-color: $secondary-background-color;
        cursor: pointer;

        &.selected {
          font-weight: bold;
        }
      }
    }

    div.panels {
      width: 100%;
      height: calc(100% - 25px);
      background-color: $secondary-background-color;

      > div {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
