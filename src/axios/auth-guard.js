import router from '@/router'
import { useUserStore } from '../stores/UserStore.js';

export function authGuard(to){
  if (useUserStore().isAuthenticated){
    return true
  }
  router.push('/connexion')
}