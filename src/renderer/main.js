import Vue from 'vue'
import App from './App'
import db from './datastore'
import 'semantic-ui-css/semantic.css'
import 'semantic-ui-css/semantic.js'
window.jQuery = window.$ = require('jquery/dist/jquery.min')

Vue.config.productionTip = false
Vue.prototype.$db = db

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
