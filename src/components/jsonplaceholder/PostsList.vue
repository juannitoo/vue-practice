<script setup>
defineProps(['posts', 'selectedPosts','postsStore' ])
</script>

<template>
  <div>
    <article v-for="post in posts" :key="post.id">
      <h5>{{ post.title }}</h5>
      <p>{{ post.body }}</p>
      <button
        class="selectionner"
        v-if="selectedPosts.filter((p) => p.id === post.id).length === 0"
        @click="postsStore.toggleSelection(post, $event.target)"
      >
        Sélectionner
      </button>
      <button class="deselectionner" v-else @click="postsStore.toggleSelection(post, $event.target)">
        Désélectionner
      </button>
    </article>
  </div>
</template>

<style scoped>
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
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
</style>