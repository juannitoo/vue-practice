<script setup>
import { onMounted, onBeforeMount, ref } from 'vue';

const posts = ref()
const loading = ref(true)
const modal = ref(false)
const selectedPost = ref([])

onBeforeMount( () => {
  loading.value = true;
})
onMounted( async () => {
  await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => { posts.value = json })
        .then(() => loading.value = false);
})

function toggleSelection(article){
  const post = {id: article.id, title: article.title}
  if (selectedPost.value.filter((p)=> p.id === post.id).length === 0){
    selectedPost.value.push(post)
  } else {
    selectedPost.value.splice(selectedPost.value.indexOf(post), 1)
  }
}

function toggleModal() {
  modal.value = !modal.value
}
</script>

<template>
  <h1>JsonPlaceHolder</h1>
  <p>En cours</p>
  <section><p v-if="loading">Chargement en cours...</p></section>

  <section>

    <article v-for="post in posts" :key="post.id">
      <h5>{{ post.title }}</h5>
      <p>{{ post.body }}</p>
      <button class="selectionner" @click="toggleSelection(post)">Sélectionner</button>
    </article>

    <button class="modale-btn" @click="toggleModal">Afficher mes articles sélectionnés</button>
    <div class="modale" v-if="modal">
      <h3>Articles sélectionnés</h3>
      <a v-for="post in selectedPost" 
        :key="post.id" class="selected-articles"
        :href="`https://jsonplaceholder.typicode.com/posts/${post.id}`"
        target="_blank">
        {{ post.title }}
      </a>
    </div>

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
.selectionner{
  padding: 0.20rem 1rem 0.20rem 1rem;
  background-color: rgb(0, 189, 126);
  position: absolute;
  bottom: 5px;
  right: 5px;
  text-align: center;
  color: black;
  &:hover{
    background-color: rgb(0, 142, 95);
  }
}
.modale-btn{
 position: fixed;
 bottom: 0;
 right: 0;
 background-color: rgb(100, 100, 100);
 padding: 1rem;
 font-size: 1.5rem;
 cursor: pointer;
 color: white;
 &:hover{
  background-color: rgb(50, 50, 50);
 }
}
.modale{
  position: fixed;
  top: 25vh;
  left: 25vw;
  width: 50vw;
  height: 50vh;
  background-color: rgb(100, 100, 100);
  padding: 1rem;
}
.modale h3{
  text-align: center;
  font-size : 1.5rem;
}
.modale a{
  color: white;
  display: block;
}
/* @media (min-width: 1024px) {

} */
</style>
