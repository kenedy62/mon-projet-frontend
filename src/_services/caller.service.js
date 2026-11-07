import axios from "axios";
import { accountService } from "./account.service";
//import router from '@/router';


const Axios = axios.create({
    // Si l'application tourne sur internet (Vercel), elle appellera directement votre Render.
    // Si vous travaillez sur votre ordinateur, elle utilisera localhost.
    baseURL: (process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost') 
      ? 'https://mon-projet-backend-1-srms.onrender.com' // <-- REMPLACEZ PAR VOTRE VRAIE URL RENDER
      : 'http://localhost:3000'
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
