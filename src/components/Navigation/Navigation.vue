<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default {
    name: 'navigation',
    created() {
        this.updateItems()

        window.addEventListener('keyup', e => this.onKeyUp(e))
    },
    data() {
        return {
            transitionName: 'slide-in'
        }
    },
    computed: {
        data() {
            return this.$store.getters.menu()
        },
        items() {
            return this.data.items
        },
        focused() {
            return this.data.focused
        },
        focusedItem() {
            const { items, focused } = this

            return items ? items[focused] : null
        },
        routes() {
            return this.$router.options.routes
        },
        fullPath() {
            return this.$route.fullPath.replace(/^\/\//, '/')
        },
        fullPathSections() {
            const path = this.fullPath
                .split('/')
                .filter(page => page !== '')

            return ['/', ...path]
        },
        currentPath() {
            return this.fullPathSections.pop()
        },
        routeChildrens() {
            const {
                routes,
                fullPathSections } = this

            return fullPathSections.reduce((acc, path) => {
                return acc
                    .find(route => route.path === path)
                    .children
            }, routes)
        }
    },
    watch: {
        '$route': 'onRouteUpdate'
    },
    methods: {
        onRouteUpdate(to, from) {
            this.updateItems()
            this.updateTransition(to, from)
        },
        updateItems() {
            const { dispatch } = this.$store
            const items = this.routeChildrens

            dispatch('setMenu', {
                path: this.fullPath,
                items
            })
        },
        updateTransition(to, from) {
            let fromPath = this.clearPath(from.path)
            let toPath = this.clearPath(to.path)

            this.transitionName = toPath.length < fromPath.length
                ? 'slide-out'
                : 'slide-in'
        },
        clearPath(path) {
            return path
                .replace(/^\/+/, '')
                .split('/')
                .filter(p => p !== '')
        },
        isActive(path) {
            return path === this.currentPath
        },
        // NOTE: wait for https://github.com/vuejs/vue-router/pull/1650
        onKeyUp({ key }) {
            const { fullPath } = this
            const { dispatch } = this.$store
            const {
                items,
                focused,
                currentPath,
                focusedItem } = this

            switch(key) {
                case 'ArrowDown':
                    if (items && items.length - 1 > focused) {
                        dispatch('setFocus', focused + 1)
                    }

                    break
                case 'ArrowUp':
                    if (focused > 0) {
                        dispatch('setFocus', focused - 1)
                    }

                    break
                case 'ArrowRight':
                case 'Enter':
                    if (!focusedItem || focusedItem.path === '') {
                        return
                    }
                    if (currentPath === focusedItem.path) {
                        return
                    }

                    let nextPath = `${fullPath}/${focusedItem.path}`.replace(/^\/\//, '')

                    this.$router.replace(nextPath)
                    break
                case 'ArrowLeft':
                    let prevPath = this.fullPathSections.join('/')

                    this.$router.replace(prevPath)
                    break
            }
        }
    }
}
</script>
<template>
    <transition :name="transitionName">
        <div class='Navigation' :key='fullPath'>
            <router-link v-for='(item, i) in items'
                :to='item.path'
                append
                :class='{
                    item: true,
                    focused: i === focused,
                    active: isActive(item.path)
                }'>
                {{item.name || item.path}}
            </router-link>
        </div>
    </transition>
</template>
<style src='./Navigation.styl' lang='stylus'/>
