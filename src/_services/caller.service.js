import axios from "axios";
import { accountService } from "./account.service";
//import router from '@/router';

const Axios = axios.create({
    // Bascule automatiquement selon l'environnement (Local vs Vercel Production)
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
});

// interceptor pour injection token
Axios.interceptors.request.use(
  (request) => {
    // Récupérez le token depuis le localStorage
    const token = localStorage.getItem('auth_token');

    // Si le token existe, ajoutez-le aux en-têtes
    if (accountService.islogged) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
