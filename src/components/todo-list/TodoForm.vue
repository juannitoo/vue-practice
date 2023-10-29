<script setup>
import { ref } from 'vue';

let thingsToDo = ref("");
const emit = defineEmits(['add']);

const addThings = function (){
  console.log("todoform add", thingsToDo)
  emit("add", thingsToDo.value)
  thingsToDo.value = ""
};

</script>

<template>
  <form @submit.prevent="addThings">
    <label for="things">Choses à faire :</label>
    <input type="text" name="things" id="things" v-model="thingsToDo" placeholder="Saisissez ici"/>
    <br>
    <button type="submit">Ajouter</button>
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
    &:hover{
      background-color: rgb(0, 128, 85);
      transition-duration: 0.4s;
    }
  } 
</style>