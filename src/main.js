import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', component: WelcomeScreen },
		{ path: '/:clipboard', component: Home }
	]
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
