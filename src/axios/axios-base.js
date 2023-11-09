import axios from 'axios'
import { useUserStore } from '../stores/UserStore.js';
import router from '@/router'

// axios s'initaialise trop vite et ne laisse pas à pinia le temps de le faire,
// même en changeant l'ordre des imports dans main.js
// ReferenceError: Cannot access 'useUserStore' before initialization
// donc j'utilise directement useUserStore().isLogged()

const Axios = axios.create({
  baseURL : 'http://localhost:3001'
});

Axios.interceptors.request.use( request => {
  if (useUserStore().isLogged()) {
    console.log("axios base", useUserStore().isLogged(), useUserStore().getToken())
    request.headers.Authorization = `Bearer ${useUserStore().getToken()}`
  }
  return request  
});

Axios.interceptors.response.use( response => {
  return response 
}, error => {
  console.log(error.response.status)
  if (error.response.status === 401) {
    useUserStore().logout()
    router.push('/connexion')
  }
});


export default Axios