<script setup>
import { onMounted, ref } from 'vue';
import LoadingIcon from '../components/LoadingIcon.vue';
import JsonplaceholderForm from '../components/jsonplaceholder/JsonplaceholderForm.vue';
import ModalItem from '../components/jsonplaceholder/ModalItem.vue';
import PostsList from '../components/jsonplaceholder/PostsList.vue';
import { useSelectedPostsStore } from '../stores/SelectedPostsStore.js';

const selectedPostsStore = useSelectedPostsStore();
const selectedPosts = selectedPostsStore.selectedPosts;
const posts = ref([])
const loading = ref(false);

// initialisation du store
selectedPostsStore.getPosts()

// je fais ca pour qu on voit le loading
const getData = new Promise((resolve) => {
  setTimeout(() => {
    resolve(posts.value = selectedPostsStore.posts);
  }, 1000);
});

onMounted( () => {
  loading.value = true;
  getData.then(() => { loading.value = false });
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
    
    <PostsList 
      :posts="posts"
      :selectedPosts="selectedPosts"
      :selectedPostsStore="selectedPostsStore"
    />

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
#loading {
  scale: 2;
  margin: 6rem auto;
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
