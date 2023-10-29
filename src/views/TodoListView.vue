<script setup>
import { ref } from 'vue';
import TodoForm from '../components/todo-list/TodoForm.vue';
import TodoList from '../components/todo-list/TodoList.vue';

let thingsToDo = ref([]);

if (window.localStorage.getItem('TodoList-vuejs-practice')) {
  thingsToDo.value = JSON.parse(window.localStorage.getItem('TodoList-vuejs-practice'));
}

const saveThings = function (data) {
  if (data.length > 1) {
    thingsToDo.value.push({ thing: data, id: Date.now() });
  }
  window.localStorage.setItem('TodoList-vuejs-practice', JSON.stringify(thingsToDo.value));
};

const deleteThing = function (thing) {
  thingsToDo.value = thingsToDo.value.filter((t) => t.id !== thing.id);
  window.localStorage.setItem('TodoList-vuejs-practice', JSON.stringify(thingsToDo.value));
  if (thingsToDo.value.length === 0 && window.localStorage.getItem('TodoList-vuejs-practice')) {
    window.localStorage.removeItem('TodoList-vuejs-practice');
  }
};

const editThing = function (thing) {
  let thingIndex = thingsToDo.value.indexOf(thing);
  thingsToDo.value.splice(thingIndex, 1, thing);
  window.localStorage.setItem('TodoList-vuejs-practice', JSON.stringify(thingsToDo.value));
};
</script>

<template>
  <h1>Todo list</h1>

  <div class="section">
    <TodoForm @add="saveThings" />

    <h3>{{ thingsToDo.length }} chose{{ thingsToDo.length > 1 ? 's' : '' }} à faire</h3>

    <TodoList :thingsToDo="thingsToDo" @delete-thing="deleteThing" @edit-thing="editThing" />
  </div>
</template>

<style>
h3 {
  margin: 4rem 0 2rem 0;
  text-align: center;
  font-size: 2rem;
}
h1 {
  margin-bottom: 2rem;
}
.section {
  box-shadow: 0px 0px 7px 4px rgb(0, 189, 126);
  padding: 1rem 0 3rem 0;
  transition: max-height 0.4s;
}
</style>
