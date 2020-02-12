/* eslint-disable */
import Vue from 'vue'
import VueSimpleAlert from "vue-simple-alert"

Vue.config.productionTip = false
Vue.use(VueSimpleAlert, { heightAuto: false} )

import './styles/editor.scss' // styling
import store from './store/index' // storage

Vue.prototype.$log = console.log // you can use "this.$log(event);" in the vue application
Vue.prototype.$store = store

import ContentMain from './components/ContentMain'
import HeaderMenu from './components/HeaderMenu'
import project from './shared/project'
import panel from './shared/panel'

window.App = new Vue({
  store,
  el: '#app',
  components: {
    ContentMain,
    HeaderMenu
  },
  data: {
    showSideBarLeft: true,
    showSideBarRight: true
  },
  methods: {
    toggleSideBar(sSide) {
      if(sSide==="left")
        this.showSideBarLeft = !this.showSideBarLeft
      else
        this.showSideBarRight = !this.showSideBarRight
    },
    sideBarLeftReload() {
      alert('sideBarLeftReload')
    },
    sideBarRightReload() {
      alert('sideBarRightReload')
    }
  },
})

project.create('Project')
panel.create('Panel')
