import courses from './courses.js';

// const login = { template: '<div>login</div>' }
// const curso = { template: '<div>curso #{{ id }}</div>' }
// const cursos = { template: '<div>cursos</div>' }

const routes = [
    { path: '/', component: courses },
    //{ path: '/login', component: login },
    //{ path: '/curso/:id', component: curso }
]
const router = new VueRouter({
    routes
})

var app = new Vue({
    el: '#app',
    router,
})
