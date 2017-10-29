import Vue from 'vue'

import store from './store'
import router from './router'

import App from './components/App/App.vue'

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router
})
