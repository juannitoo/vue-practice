import axios from 'axios'
import { useUserStore } from '../stores/UserStore.js';
import router from '@/router'

// axios s'initaialise trop vite et ne laisse pas à pinia le temps de le faire,
// même en changeant l'ordre des imports dans main.js
// ReferenceError: Cannot access 'useUserStore' before initialization
// donc j'utilise directement useUserStore().isAuthenticated

const Axios = axios.create({
  baseURL : 'http://localhost:3001'
});

Axios.interceptors.request.use( (request) => {
  if (useUserStore().isAuthenticated) {
    console.log("ajout interceptor JWT")
    request.headers.Authorization = `Bearer ${useUserStore().getToken()}`
  }
  return request  
});

Axios.interceptors.response.use( (response) => {
  return response 
}, (error) => {
  console.log(error)
  if (error.response.status === 401) {
    console.log("kicked by response interceptor JWT")
    useUserStore().logout()
    router.push('/connexion')
  }
});


export default Axios