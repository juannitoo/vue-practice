<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

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
<h1>Salut {{ userData.email }} </h1>
<p> Voilà votre mot de passe haché : {{ userData.password }}</p>


</template>

<style scoped>
p{
  margin-top: 3rem;
  font-size : 1.5rem;
}
</style>