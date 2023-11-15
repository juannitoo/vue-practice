<script setup>
import { useUserStore } from '../stores/UserStore.js';
import { useRoute } from 'vue-router'

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

UserStore.getUsers()

</script>

<template>
  <h1>Administration</h1>
  
  <div v-if="useRoute().fullPath === '/admin'">
    <h3 class="mon-compte">
      <RouterLink :to="`/admin/user/${userId}`">
        Gérez mon compte
      </RouterLink>
    </h3>
    <p>Les users présents dans la base de données :</p>
    <p>
      <ol>
        <li v-for="user in UserStore.users" :key="user.id">
          {{ user.email }}
        </li>
      </ol>
    </p>
  </div>

  <div v-else>
    <RouterView></RouterView>
  </div>

</template>

<style scoped>
.mon-compte{
  font-size: 2.5rem;
  margin: 9rem auto;
  text-align: center;
}
p {
  text-align: center;
  display: block;
  margin: 1.5rem auto;
  font-size: 1.8rem;
}
ol{
  width: 50%;
  margin: 3rem auto;
}

</style>