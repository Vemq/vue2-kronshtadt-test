import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueApexCharts from 'vue-apexcharts'
import './base.css'
import App from './App.vue'

Vue.use(VueApexCharts)
Vue.use(ElementUI)
Vue.component('apexchart', VueApexCharts)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
