<script setup>
  const tel = "06 51 21 35 17";
  const email = "jeanbalangue@hotmail.fr";
</script>

<template>
  <div>
    <h2>
      Jean BALANGUÉ
    </h2>
    <h4>
      <a href="tel:+33651213517" :alt="`téléphone ${ tel }`">{{ tel }}</a>
    </h4>
    <h4>
      <a :href="`mailto:${ email }`" alt="email jean balangue @ hotmail fr">
        {{ email }}
      </a>
    </h4>
</div>
</template>

<style scoped>
h2{
  text-align: center;
  font-size: 3rem;
  margin: 2rem;
}
h4{
  text-align: center;
  font-size: 1.7rem;
  margin: 2rem 0 2rem 0;
}

a{
  padding: 1rem;
}
div{
  /* border-top: 3px solid rgb(0, 189, 126); */
  /* box-shadow: 0px 0px 7px 4px rgb(0, 189, 126); */
  /* border-bottom : 25px solid #181818; */
  margin: 4rem 0 0 0;
  padding: 1rem 0 2rem 0;; 
}
</style>