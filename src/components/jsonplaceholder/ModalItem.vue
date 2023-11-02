<script setup>
import { ref } from 'vue';

const modal = ref(false);
defineProps(['nombrePosts', 'selectedPosts']);

function toggleModal() {
  modal.value = !modal.value;
}
</script>

<template>
  <div>
    <button class="modale-btn" @click="toggleModal" v-if="!modal">
      {{ nombrePosts }} article{{ nombrePosts > 1 ? 's' : '' }} sélectionné{{
        nombrePosts > 1 ? 's' : ''
      }}
    </button>
    <button class="modale-btn" @click="toggleModal" v-else>Fermer la fenêtre</button>
    <div class="modale" v-if="modal">
      <h3>Articles sélectionnés</h3>
      <a
        class="selected-articles"
        v-for="post in selectedPosts"
        :key="post.id"
        :href="`https://jsonplaceholder.typicode.com/posts/${post.id}`"
        target="_blank"
      >
        {{ post.title }}
      </a>
    </div>
  </div>
</template>

<style>
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
</style>
