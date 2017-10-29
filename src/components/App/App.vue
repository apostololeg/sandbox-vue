<template>
    <div class='App'>
        <BreadCrumbs/>
        <Navigation/>
        <transition name='fade'>
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import Navigation from '../Navigation/Navigation.vue'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs.vue'

export default {
    name: 'app',
    components: {
        Navigation,
        BreadCrumbs
    }
}
</script>
<style src='./App.styl' lang='stylus'></style>
