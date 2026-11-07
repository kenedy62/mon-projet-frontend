import axios from "axios";
import { accountService } from "./account.service";
//import router from '@/router';

const Axios = axios.create({
    // Checks standard NODE_ENV OR if running inside Vercel's hosting environment
    baseURL: (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') ? '' : 'http://localhost:3000'
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
