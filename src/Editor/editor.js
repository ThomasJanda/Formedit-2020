import '../styles/editor.scss'
import '../store/index'

import Vue from 'vue'
import ContentMain from './components/ContentMain'
import HeaderMenu from './components/HeaderMenu'

export const editor = new Vue({
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
