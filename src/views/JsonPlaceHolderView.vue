<script setup>
import { onMounted, ref } from 'vue';
import LoadingIcon from '../components/LoadingIcon.vue';
import JsonplaceholderForm from '../components/jsonplaceholder/JsonplaceholderForm.vue';
import ModalItem from '../components/jsonplaceholder/ModalItem.vue';

import { useSelectedPostsStore } from '../stores/SelectedPostsStore.js'

const selectedPostsStore = useSelectedPostsStore();
const selectedPosts = selectedPostsStore.selectedPosts;


const posts = ref();
const loading = ref(Boolean);

onMounted(async () => {
  loading.value = true;
  setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        posts.value = json;
      })
      .then(() => (loading.value = false));
  }, 1000); // Oh le beau loading !

  // await fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((response) => response.json())
  //       .then((json) => { posts.value = json })
  //       .then(() => loading.value = false);
});

// id : Date.now() pr la démo
function addPost(data) {
  if (data.title.length > 1 && data.title.length > 1) {
    posts.value.splice(0, 0, { title: data.title, id: Date.now(), body: data.body });
  }
}
</script>

<template>
  <h1>JsonPlaceHolder</h1>
  <section v-if="loading">
    <div id="loading"><LoadingIcon /></div>
  </section>
  <section v-else>
    <div id="form">
      <JsonplaceholderForm @add="addPost" />
    </div>

    <article v-for="post in posts" :key="post.id">
      <h5>{{ post.title }}</h5>
      <p>{{ post.body }}</p>
      <button
        class="selectionner"
        v-if="selectedPosts.filter((p) => p.id === post.id).length === 0"
        @click="selectedPostsStore.toggleSelection(post, $event.target)"
      >
        Sélectionner
      </button>
      <button class="deselectionner" v-else @click="selectedPostsStore.toggleSelection(post, $event.target)">
        Désélectionner
      </button>
    </article>

    <ModalItem 
      :nombrePosts="selectedPostsStore.nbrePosts" 
      :selectedPosts="selectedPosts"
    />

  </section>
</template>

<style scoped>
section {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
#form {
  width: 100%;
  padding-bottom: 2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgb(0, 189, 126);
}
article {
  margin-top: 2rem;
  width: 30%;
  padding: 1em;
  box-shadow: 0px 0px 7px 4px rgb(0, 189, 126);
  position: relative;
  animation: append-animate 0.3s linear;
  overflow: hidden;
}
h5 {
  font-style: italic;
  font-size: 1.1rem;
}
p {
  font-size: 0.9rem;
  color: rgb(100, 100, 100);
  text-align: justify;
  margin-bottom: 1rem;
}
#loading {
  scale: 2;
  margin: 6rem auto;
}
.selectionner {
  padding: 0.2rem 1rem 0.2rem 1rem;
  background-color: rgb(0, 189, 126);
  position: absolute;
  bottom: 5px;
  right: 5px;
  text-align: center;
  color: black;
  cursor: pointer;
  transition-duration: 0.4s;
  &:hover {
    background-color: rgb(0, 142, 95);
  }
}
.deselectionner {
  padding: 0.2rem 1rem 0.2rem 1rem;
  background-color: rgb(253, 253, 104);
  position: absolute;
  bottom: 5px;
  right: 5px;
  text-align: center;
  color: black;
  cursor: pointer;
  transition-duration: 0.4s;
  &:hover {
    background-color: rgb(210, 186, 6);
  }
}

@media (min-width: 850px) {
  #form {
    width: 100%;
    padding-bottom: 2rem;
    margin: 0 1rem 1rem 1rem;
    border-bottom: 2px solid rgb(0, 189, 126);  
  }
}
</style>
