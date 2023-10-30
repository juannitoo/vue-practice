<script setup>
import { ref } from 'vue';

const post = ref({});
const titleValue = ref('');
const contentValue = ref('');
const error = ref({ isTitleError: false, isContentError: false, message: [] });

const emit = defineEmits(['add']);

const validTitle = function (value) {
  if (value.length < 2 || value.valueOf().length === 0) {
    error.value.isTitleError = true;
    if (!error.value.message.includes('Titre minimum 2 caractères')) {
      error.value.message = ['Titre minimum 2 caractères', ...error.value.message];
    }
  } else {
    error.value.isTitleError = false;
    if (error.value.message.includes('Titre minimum 2 caractères')) {
      error.value.message.splice(error.value.message.indexOf('Titre minimum 2 caractères'), 1);
    }
  }
};

const validContent = function (value) {
  if (value.length < 2) {
    error.value.isContentError = true;
    if (!error.value.message.includes('Contenu minimum 2 caractères')) {
      error.value.message = [...error.value.message, 'Contenu minimum 2 caractères'];
    }
  } else {
    error.value.isContentError = false;
    if (error.value.message.includes('Contenu minimum 2 caractères')) {
      error.value.message.splice(error.value.message.indexOf('Contenu minimum 2 caractères'), 1);
    }
  }
};

const addArticle = function (titleValue, contentValue) {
  if (titleValue === '') {
    (error.value.message = [...error.value.message, 'Titre minimum 2 caractères']),
      (error.value.isTitleError = true);
  }
  if (contentValue === '') {
    error.value.message = [...error.value.message, 'Contenu minimum 2 caractères'];
    error.value.isContentError = true;
  }
  if (!error.value.isTitleError && !error.value.isContentError) {
    post.value = { title: titleValue, body: contentValue };
    console.log('VALID OK', post.value);
    emit('add', post.value);
    titleValue = '';
    contentValue = '';
  }
};
</script>

<template>
  <form @submit.prevent="addArticle(titleValue, contentValue)">
    <label for="titre">Titre :</label>
    <input
      type="text"
      name="titre"
      id="titre"
      v-model="titleValue"
      placeholder="Saisissez le titre"
      @keyup="validTitle(titleValue)"
    />

    <label for="content">Contenu de l'article :</label>
    <textarea
      id="content"
      name="content"
      rows="3"
      column="50"
      placeholder="Saisissez le contenu"
      v-model="contentValue"
      @keyup="validContent(contentValue)"
    ></textarea>

    <button v-if="!error.isTitleError && !error.isContentError" type="submit">
      Ajouter un article
    </button>
    <button v-else disabled class="error-message">
      <span v-for="(message, index) in error.message" :key="index"> {{ message }}<br /> </span>
    </button>
  </form>
</template>

<style scoped>
input,
button,
label,
textarea {
  display: block;
  font-size: 1.4rem;
  margin: 0 auto;
  width: 600px;
}
button,
input,
textarea {
  padding: 0.7rem;
}
button {
  background-color: rgb(0, 189, 126);
  color: white;
  font-weight: bold;
  border-radius: 4px;
  transition-duration: 0.4s;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgb(0, 128, 85);
    transition-duration: 0.4s;
  }
}
.error-message {
  background-color: rgb(255, 100, 100);
  &:hover {
    background-color: rgb(255, 100, 100);
  }
}
</style>
