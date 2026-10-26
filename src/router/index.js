import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about/:id',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
  path:'/admin',
  name:'admin',
  component:() => import('../views/admin/LoginView.vue'),
  },
  {
  path:'/gestion',
  name:'gestion',
component:() => import('../views/admin/GestionView.vue'),
 meta: { requiresAuth: true }
  },
  {
    path:'/produits',
    name:'produits',
    component: ()=> import('../views/admin/ProduitView.vue'),
     meta: { requiresAuth: true }
  },
  {
    path:'/commentaires',
    name:'commentaires',
    component: ()=> import('../views/admin/CommentaireView.vue'),
     meta: { requiresAuth: true }
  },
  {
    path:'/option',
    name:'option',
    component: ()=> import('../views/admin/OptionView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path:'/profilAdmin',
    name:'/profilAdmin',
    component: ()=> import('../views/admin/AdminView.vue'),
    meta: { requiresAuth: true }
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 🎯 À ajouter à la fin de votre fichier router/index.js

router.beforeEach((to, from, next) => {
  // Vérifie si la route nécessite une authentification
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // Récupère votre token
  const token = localStorage.getItem('token');

  if (requiresAuth && !token) {
    // ❌ Pas de token -> Redirection immédiate
    next('/admin');
  } else {
    //  Token présent ou route publique -> Accès autorisé
    next();
  }
});

export default router