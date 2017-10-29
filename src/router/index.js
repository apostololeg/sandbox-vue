import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home/Home.vue'
import CV from '../components/CV/CV.vue'
import ProjectView from '../components/ProjectView/ProjectView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            children: [
                {
                    path: 'projects',
                    name: 'Projects',
                    children: [
                        {
                            path: 'database',
                            name: 'Database',
                            children: [
                                {
                                    path: 'mongopromise',
                                    component: ProjectView
                                }
                            ]
                        },
                        {
                            path: 'bemjson-to-html',
                            component: ProjectView
                        }
                    ]
                },
                {
                    path: 'test2',
                    name: 'Test 2lv',
                    children: [
                        {
                            path: 'item2',
                            name: 'item 2',
                            component: ProjectView
                        }
                    ]
                },
                {
                    path: 'test3',
                    name: 'Test 4lv',
                    children: [
                        {
                            path: 'level-1.1',
                            name: 'level 1.1',
                            component: ProjectView
                        },
                        {
                            path: 'level-1.2',
                            name: 'level 1.2',
                            children: [
                                {
                                    path: 'level-2.1',
                                    name: 'level 2.1',
                                    children: [
                                        {
                                            path: 'level-3.1',
                                            name: 'level 3.1',
                                            component: ProjectView
                                        },
                                        {
                                            path: 'level-3.2',
                                            name: 'level 3.2',
                                            component: ProjectView
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'cv',
                    name: 'CV',
                    component: CV
                }
            ]
        }
    ]
})

export default router
