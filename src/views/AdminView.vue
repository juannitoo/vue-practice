<script setup>
import { useUserStore } from '../stores/UserStore.js';

const UserStore = useUserStore();

let userId = UserStore.user.userId
// refresh
if (userId === undefined ){
  try {
    UserStore.getUserFromLocalStorage()
    userId = UserStore.user.userId
  } catch  (error)  {
    UserStore.logout(userId)
  }
}  

// await UserStore.getUsers()
// let users = UserStore.users

</script>

<template>
  <h1>Administration</h1>
  
  <p>
    <RouterLink :to="`/admin/user/${userId}`">
      Gérez mon compte
    </RouterLink>
  </p>

  <RouterView></RouterView>
  
    <!-- suspense pbm ... pour le moment -->
    <!-- <p v-for="user in users" :key="user.id">
      <ul>
        <ol>
          {{ user.email }}
        </ol>
      </ul>
    </p> -->

</template>

<style scoped>
p {
  text-align: center;
  display: block;
  margin: 8rem auto;
  font-size: 1.5rem;
}

</style>