import { createRouter, createWebHistory } from 'vue-router';
import Products from '../views/Products.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
    { path: '/', component: Login },
    { 
        path: '/products', 
        component: Products,
        meta: { requiresAuth: true } // Protegendo a rota
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Verifica se a rota precisa de autenticação antes de acessar
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login'); // Redireciona para login se não estiver autenticado
    } else {
        next(); // Permite acesso
    }
});

export default router;
