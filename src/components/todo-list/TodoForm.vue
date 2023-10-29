<script setup>
import { ref } from 'vue';

let thingsToDo = ref("");
let errorMessage = ref(false);

const emit = defineEmits(['add']);

const validField = function(value){
  if(value.length < 2){
    errorMessage.value = true
    return false
  } else {
    errorMessage.value = false
    return true
  }
}

const addThings = function (fieldValue){
  if (validField(fieldValue)) {
    emit("add", thingsToDo.value)
    thingsToDo.value = ""
    errorMessage.value = false
  }
};

</script>

<template>
  <form @submit.prevent="addThings(thingsToDo)">
    <label for="things">Choses à faire :</label>
    <input type="text" name="things" id="things" v-model="thingsToDo" placeholder="Saisissez ici" @keyup="validField(thingsToDo)" />
    <button v-if="!errorMessage" type="submit">Ajouter</button>
    <button v-else disabled style="backgroundColor:rgb(255,100,100)">Minimun 2 caractères</button>
  </form>
</template>

<style scoped>
  label, input, button {
    display: block;
    font-size: 1.8rem;
  }
  input, button, label{
    margin: 0 auto;
    text-align: center;
  }
  button, input{
    padding : 0.7rem;
    font-size: 1.5rem;
  }
  button {
    background-color: rgb(0, 189, 126);
    color: white;
    font-weight: bold;
    border-radius: 4px;
    transition-duration: 0.4s;
    margin-top: 1rem;
    cursor: pointer;
    &:hover{
      background-color: rgb(0, 128, 85);
      transition-duration: 0.4s;
    }
  }
  .error-message{
    color: red;
    display: block;
    text-align : center;
    margin: 0.5rem 0 0.5rem 0;
  }
</style>