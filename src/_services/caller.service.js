import axios from "axios";
import { accountService } from "./account.service";
//import router from '@/router';
const Axios= axios.create ({
    baseURL:'http://localhost:3000'
})
// inteceptor pour injection token

    Axios.interceptors.request.use(
  (request) => {
    // Récupérez le token depuis le localStorage
    const token = localStorage.getItem('auth_token');

    // Si le token existe, ajoutez-le aux en-têtes
    if (accountService.islogged) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request
  },
  (error) => {
    return Promise.reject(error);
  }
);
  
    // console.log(request)
    // let token= accountService.getToken
    // //   console.log(token)
    // if(accountService.islogged) {
    //     request.headers.Authorization ='Bearer'+token
    // }
    // return request

//interceptor pour supprimer 
// le token et la reponse de la l'api
// Axios.interceptors.response.use(response => {return response},  
// error =>{
//     if(error.status==401) {
//         console.log('erreur de connexion')
//         //accountService.lagout()
//         //router.push('/admin')
//     }
// }
// )
export default Axios