<script setup>
import { onMounted, onBeforeMount, ref } from 'vue';

const posts = ref()
const loading = ref(true)

onBeforeMount( () => {
  loading.value = true;
})
onMounted( () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
          .then((response) => response.json())
          .then((json) => { posts.value = json })
          .then( () => loading.value = false );
})
</script>

<template>
  <h1>JsonPlaceHolder</h1>
  <p>En cours</p>
  <section><p v-if="loading">Chargement en cours...</p></section>
  <section>
    <article v-for="post in posts" :key="post.id">
      <h5>{{ post.title }}</h5>
      <p>{{ post.body }}</p>
      <div class="ajouter">Ajouter</div>
    </article>
  </section>
</template>

<style scoped>
section{
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
  justify-content: space-between;
}
article{
  margin-top: 2rem;
  width: 30%;
  padding: 1em;
  box-shadow: 0px 0px 7px 4px rgb(0, 189, 126);
  position : relative; 
}
h5{
  font-style: italic;
  font-size: 1.1rem;
}
p{
  font-size: 0.9rem;
  color: rgb(100, 100, 100);
  text-align: justify;
  margin-bottom: 1rem;
}
.ajouter{
  width: 25%;
  background-color: rgb(0, 189, 126);
  position: absolute;
  bottom: 5px;
  right: 5px;
  text-align: center;
  color: black;
}
/* @media (min-width: 1024px) {

} */
</style>
