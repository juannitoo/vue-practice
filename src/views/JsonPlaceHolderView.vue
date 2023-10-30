<script setup>
import { onMounted, ref, computed } from 'vue';
import LoadingIcon from '../components/LoadingIcon.vue';
import JsonplaceholderForm from '../components/jsonplaceholder/JsonplaceholderForm.vue';

const posts = ref();
const loading = ref(Boolean);
const modal = ref(false);
const selectedPost = ref([]);
const nombrePosts = computed(() => {
  return selectedPost.value.length;
});

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

function toggleSelection(article, button) {
  if (selectedPost.value.includes(article, button)) {
    selectedPost.value.splice(selectedPost.value.indexOf(article), 1);
    button.textContent = 'Sélectionner';
  } else {
    selectedPost.value.push(article);
    button.textContent = 'Déselectionner';
  }
}

function toggleModal() {
  modal.value = !modal.value;
}

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
        v-if="selectedPost.filter((p) => p.id === post.id).length === 0"
        class="selectionner"
        @click="toggleSelection(post, $event.target)"
      >
        Sélectionner
      </button>
      <button v-else class="deselectionner" @click="toggleSelection(post, $event.target)">
        Désélectionner
      </button>
    </article>

    <button class="modale-btn" @click="toggleModal" v-if="!modal">
      {{ nombrePosts }} article{{ nombrePosts > 1 ? 's' : '' }} sélectionné{{
        nombrePosts > 1 ? 's' : ''
      }}
    </button>
    <button class="modale-btn" @click="toggleModal" v-else>Fermer la fenêtre</button>
    <div class="modale" v-if="modal">
      <h3>Articles sélectionnés</h3>
      <a
        v-for="post in selectedPost"
        :key="post.id"
        class="selected-articles"
        :href="`https://jsonplaceholder.typicode.com/posts/${post.id}`"
        target="_blank"
      >
        {{ post.title }}
      </a>
    </div>
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
.modale-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgb(100, 100, 100);
  padding: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  z-index: 2;
  &:hover {
    background-color: rgb(50, 50, 50);
  }
}
.modale {
  position: fixed;
  bottom: 0rem;
  height: 50vh;
  right: 0vw;
  width: 50%;
  max-width: 600px;
  background-color: rgb(100, 100, 100);
  padding: 1rem;
  z-index: 1;
  overflow: auto;
}
.modale h3 {
  text-align: center;
  font-size: 1.5rem;
  margin-top: -1rem;
}
.modale a {
  color: white;
  display: block;
}
/* @media (min-width: 1024px) {

} */
</style>
