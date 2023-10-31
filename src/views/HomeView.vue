<script setup>
// import TheWelcome from '../components/TheWelcome.vue';
</script>

<template>
  <h1>Bienvenue sur Vue Practice</h1>
  <section>
    <article id="presentation">
      <p>
        Ce site de démonstration me permet de m'exercer avec VueJs 3 et vous permet par la même
        occasion d'évaluer mon niveau. L'essentiel pour moi est de pouvoir intervenir 
        sur un projet sans perdre trop de temps sur la compréhension de ce framework 
        et de pouvoir m'adapter rapidement. Je dois donc en comprendre les rouages principaux.
        Le reste viendra avec l'expérience.
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
        Todo list avec LocalStorage<br />
        JsonPlaceHolder avec formulaire et sélection simple<br />
        Css responsive basique mais fonctionnel<br />
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
  /* width: 48%; */
  width: 50%;
  padding: 3rem;
  /* box-shadow: 0px 0px 7px 4px rgb(0, 189, 126); */
}
#presentation{
  border-right: 3px solid rgb(0, 138, 92);
  /* border-right: 3px solid #069F6E; */
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
    /* box-shadow: 0px 0px 7px 4px rgb(0, 189, 126); */
    border-bottom: 3px solid rgb(0, 189, 126);
  }
  #presentation{
  border-right: 0px solid rgb(0, 189, 126);
}
}
</style>
