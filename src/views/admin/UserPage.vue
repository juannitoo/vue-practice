<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/UserStore.js';

const UserStore = useUserStore();
const router = useRouter();

const userEmail = UserStore.user.email;

let userId = UserStore.user.userId
// refresh
if (userId === undefined ||  UserStore.user === undefined){
  try {
    UserStore.getUserFromLocalStorage()
    userId = UserStore.user.userId
  } catch  (error)  {
    UserStore.logout(userId)
  }
}  

function onDeleteAccount() {
  UserStore.deleteAccount(userId).then(() => router.push({ name: 'home' }));
}

</script>

<template>
  <div>
    <h2>Bonjour {{ userEmail }}</h2>
    <p>Vous ne pouvez que supprimer votre compte vu le backend utilisé.</p>

    <button class="delete-account" @click="onDeleteAccount">Supprimer votre compte</button>
  </div>
</template>

<style scoped>
h2{
  margin: 8rem auto;
  text-align: center;
  font-size: 2rem;
}
p{
  text-align: center;
  display: block;
  margin: 8rem auto;
  font-size: 1.5rem;
}
.delete-account {
  background-color: rgb(255, 100, 100);
  color: white;
  display: block;
  padding: 2rem;
  font-size: 2rem;
  margin: 5rem auto;
  transition: 0.4s;
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 20, 20);
  }
}
</style>
