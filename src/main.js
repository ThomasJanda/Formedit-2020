import Vue from 'vue'
Vue.config.productionTip = false
/*
you can use
this.$log(event);
in the vue application
 */
Vue.prototype.$log = console.log
import './Editor/editor'
