import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'; // Global Axios module import

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

// Response interceptor setup
axios.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Session expirée. Déconnexion automatique.");
      localStorage.removeItem('token'); 
      router.push('/admin'); 
    }
    return Promise.reject(error);
  }
);

// Ensure NO "const apiClient = axios.create({...})" remains at the bottom of this file!
