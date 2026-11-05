import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios';

loadFonts()

createApp(App).use(router)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

// 🎯 Cet intercepteur écoute toutes les réponses du backend
axios.interceptors.response.use(
  (response) => response, 
  (error) => {
    // Si votre serveur renvoie une erreur 401 (Token expiré / non valide)
    if (error.response && error.response.status === 401) {
      console.warn("Session expirée. Déconnexion automatique.");
      
      // 🧽 Nettoyage du stockage local
      localStorage.removeItem('token'); 
      
      // 🚀 Redirection instantanée vers votre page login existante
      router.push('/admin'); 
    }
    return Promise.reject(error);
  }
);
import axios from 'axios';

const apiClient = axios.create({
  // En production sur Vercel, l'URL relative se basera sur votre domaine
  // En développement local, vous pouvez garder http://localhost:3000
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
  timeout: 10000,
});

export default apiClient;

