// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import cookie from 'vue-cookies'
import cityJson from 'cityjson-vue-components'
import webrtc from 'webrtc-ips'
// import base64js from 'base64-js'
import base64 from 'base-64'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// eslint-disable-next-line no-unused-vars
import 'jquery/src/jquery'
import 'bootstrap3/dist/css/bootstrap.min.css'
import 'bootstrap-table/src/bootstrap-table'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$cookie = cookie
Vue.prototype.$qs = qs
Vue.prototype.$cityJson = cityJson
Vue.prototype.$webrtc = webrtc
// Vue.prototype.$base64js = base64js
Vue.prototype.$base64 = base64


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
