<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/UserStore.js';

const UserStore = useUserStore();
const router = useRouter()

function onDeleteAccount() {
  UserStore.deleteAccount(UserStore.user.userId)
  .then( () => router.push({ name: 'home' }) )
}

</script>

<template>
  <div>
    <h1>Salut {{ UserStore.user.email }} </h1>
    <p> Voilà votre token : {{ UserStore.user.token }}</p>

    <button 
      class="delete-account"
      @click="onDeleteAccount">
      Supprimer votre compte
    </button>
  </div>

</template>

<style scoped>
p{
  margin-top: 3rem;
  font-size : 1.5rem;
}
.delete-account{
  background-color: rgb(255,100,100);
  color: white;
  display: block;
  padding: 2rem;
  font-size: 2rem;
  margin: 5rem auto;
  transition: 0.4s;
  &:hover{
    background-color: rgb(255,20,20);
  }
}
</style>