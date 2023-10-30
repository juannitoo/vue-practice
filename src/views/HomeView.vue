<script setup>
// import TheWelcome from '../components/TheWelcome.vue';
</script>

<template>
  <h1>Bienvenue sur Vue Practice</h1>
  <section>
    <article>
      <p>
        Ce site de démonstration me permet de m'exercer avec VueJs 3 et vous permet par la même
        occasion d'évaluer mon niveau. Je n'en suis qu'au début de mon apprentissage mais
        l'essentiel pour moi est de pouvoir intervenir sur un projet sans perdre trop de temps sur
        la compréhension de ce framework et de pouvoir m'adapter rapidement.
      </p>
    </article>
    <article>
      <p>
        <a
          href="https://github.com/juannitoo/vue-practice"
          alt="lien vers le referentiel Github"
          target="_blank"
        >
          Repository Github
        </a>
      </p>
      <p>
        Single File Components<br />
        Composition API<br />
      </p>
    </article>
  </section>
</template>

<style scoped>
section {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex: 0 0 100%;
  justify-content: space-between;
  flex-direction: row wrap;
  animation: append-animate 0.3s linear;
}
article {
  width: 48%;
  padding: 1em;
  box-shadow: 0px 0px 7px 4px rgb(0, 189, 126);
}
p {
  font-size: 1.2rem;
  text-align: justify;
}
@media (max-width: 768px) {
  section {
    flex-direction: column;
    justify-content: space-between;
  }
  article {
    width: 100%;
    margin-bottom: 1rem;
    box-shadow: 0px 0px 7px 4px rgb(0, 189, 126);
  }
}
</style>
