import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)


export const store = new Vuex.Store({
  state: {
    baseUrl: 'https://localhost:10256/soaLabGatway/api/v1',
  }
})



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
