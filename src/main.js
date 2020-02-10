/* eslint-disable */
import Vue from 'vue'
import VueSimpleAlert from "vue-simple-alert"

Vue.config.productionTip = false
Vue.use(VueSimpleAlert)

import './styles/editor.scss' // styling
import store from './store/index' // storage

Vue.prototype.$log = console.log // you can use "this.$log(event);" in the vue application
Vue.prototype.$store = store

import ContentMain from './components/ContentMain'
import HeaderMenu from './components/HeaderMenu'

window.App = new Vue({
  store,
  el: '#app',
  components: {
    ContentMain,
    HeaderMenu
  },
  data: {
  },
  methods: {
    sideBarLeftReload() {
      alert('sideBarLeftReload')
    },
    sideBarRightReload() {
      alert('sideBarRightReload')
    }
  },
})
