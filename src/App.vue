<script setup>
import { RouterLink, RouterView } from 'vue-router';
import FooterItem from './components/FooterItem.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/todo-list">Todo list</RouterLink>
        <RouterLink to="/jsonplaceholder">JsonPlaceHolder</RouterLink>
        <RouterLink to="/connexion">Connexion</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <footer>
    <FooterItem />
  </footer>
</template>

<style>
@keyframes append-animate {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

h1 {
  text-align: center;
  margin-top: 2rem;
  font-size: 3.5rem;
}

nav {
  width: 100%;
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  line-height: 2.5rem;
  padding: 1rem 1.5rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (max-width: 850px) { 
  h1{
    font-size: 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    /* margin: 0 2rem 0 0; */
    margin: 0 auto;
  }
  nav {
    text-align: left;
    margin-left: 1rem;
    font-size: 1rem;
    padding: 0.2rem 0;
    margin-top: 1rem;
  }
  nav a {
    display: block;
    line-height: 1rem;
    /* padding: 1rem 1.5rem; */
    border-left: 1px solid var(--color-border);
  }
  nav a:first-of-type {
    border-left: 1px solid var(--color-border);
}
}
</style>
