import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        menu: {
            current: {}
        }
    },
    mutations: {
        setMenu({ menu }, { path, items }) {
            Vue.set(menu, path, {
                focused: 0,
                ...menu[path],
                items,
                path
            })
            Vue.set(menu, 'current', menu[path])
        },
        setFocus(state, index) {
            Vue.set(state.menu.current, 'focused', index)
        }
    },
    getters: {
        menu: ({ menu }) => path => {
            return path
                ? menu[path]
                : menu.current
        }
    },
    actions: {
        setMenu({ commit }, data) {
            commit('setMenu', data)
        },
        setFocus({ commit }, index) {
            commit('setFocus', index)
        }
    }
})

export default store
