<script>
export default {
    computed: {
        fullPath() {
            return this.$route.fullPath
        },
        fullPathSections() {
            let path = this.fullPath
                .split('/')
                .filter(page => page !== '')

            return ['/', ...path]
        },
        routes() {
            return this.$router.options.routes
        },
        items() {
            const items = []

            this.fullPathSections.reduce((routes, path, i, arr) => {
                let {
                    name,
                    children } = routes.find(item => item.path === path)
                let href = arr
                    .slice(0, i + 1)
                    .join('/')
                    .replace(/^\/\//, '/')

                items.push({ href, name, path })

                return children
            }, this.routes)

            return items
        }
    }
}
</script>
<template>
    <div class='BreadCrumbs'>
        <transition-group name='fade'>
            <router-link class='item'
                v-for='item in items'
                :to='item.href'
                :key='item.path'
                v-text='item.name || item.path'>
            </router-link>
        </transition-group>
    </div>
</template>
<style src='./BreadCrumbs.styl' lang='stylus'/>
