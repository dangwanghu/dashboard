import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './router'
import pullToRefresh from './directives/pullToRefresh'
import infiniteScroll from './directives/infiniteScroll'
import * as filters from './filters'
import app from './main'


// Router
Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: false
})

routerConfig(router)

// Resource
Vue.use(VueResource)

Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'src/assets/data' : 'static/data'
Vue.http.options.emulateJSON = true

// Directive
Vue.directive('pullToRefresh', pullToRefresh)
Vue.directive('infiniteScroll', infiniteScroll)

// Filters
Vue.filter('date', filters.dateFilter)
Vue.filter('handleLongestText', filters.handleLongestText)
Vue.filter('statusDesc', filters.statusDesc)
Vue.filter('dateDiff', filters.dateDiff)

router.start(app, '#app')

window.router = router
