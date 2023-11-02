<script setup>
import { onMounted, ref } from 'vue';
import LoadingIcon from '../components/LoadingIcon.vue';
import JsonplaceholderForm from '../components/jsonplaceholder/JsonplaceholderForm.vue';
import ModalItem from '../components/jsonplaceholder/ModalItem.vue';
import PostsList from '../components/jsonplaceholder/PostsList.vue';
import { usePostsStore } from '../stores/PostsStore.js';

const PostsStore = usePostsStore();
const selectedPosts = PostsStore.selectedPosts;
const posts = ref([]);
const loading = ref(false);

// initialisation du store
PostsStore.getPosts();

// je fais ca pour le loading
const getData = new Promise((resolve) => {
  setTimeout(() => {
    resolve((posts.value = PostsStore.posts));
  }, 1000);
});

onMounted(() => {
  loading.value = true;
  getData.then(() => {
    loading.value = false;
  });
});

function newId(posts) {
  let idTab = [];
  for (const post of posts.value) {
    idTab.push(Number(post.id));
  }
  let idMax = Math.max(...idTab);
  return idMax + 1;
}

function addPost(data) {
  if (data.title.length > 1 && data.title.length > 1) {
    posts.value.splice(0, 0, { title: data.title, id: newId(posts), body: data.body });
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

    <PostsList :posts="posts" :selectedPosts="selectedPosts" :postsStore="PostsStore" />

    <ModalItem :nombrePosts="PostsStore.nbrePosts" :selectedPosts="selectedPosts" />
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
