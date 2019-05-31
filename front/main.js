import courses from './courses.js';
import login from './login.js';
import join from './join.js';
import course from './course.js';


const routes = [
    { path: '/', component: courses },
    { path: '/login', component: login },
    { path: '/join', component: join },
    { path: '/course/:id', component: course }
]
const router = new VueRouter({
    routes
})

var app = new Vue({
    el: '#app',
    router,
})
