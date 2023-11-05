<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/UserStore.js';

const UserStore = useUserStore();

// const router = useRouter()
const route = useRoute()
const userData = ref("")

async function getUser(){
  await fetch(`http://localhost:3001/api/users/${route.params.id}`)
    .then((response) => response.json())
    .then((data) => userData.value = data )
}

onMounted(()=> {
  getUser()
})

</script>

<template>
  <div>
    <h1>Salut {{ UserStore.email }} </h1>
    <p> Voilà votre mot de passe haché : {{ userData.password }}</p>
    <p> Voilà votre token : {{ UserStore.token }}</p>
  </div>

</template>

<style scoped>
p{
  margin-top: 3rem;
  font-size : 1.5rem;
}
</style>