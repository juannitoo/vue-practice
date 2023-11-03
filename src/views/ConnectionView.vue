<script setup>
import { ref, watch } from 'vue';

const email = ref("")
const password = ref("")
const password2 = ref("")
const mailError = ref(false)
const passwordError = ref(false)
const passwordError2 = ref(false)
const errors = ref({error: false, message: [""] })
const isConnectionTabActive = ref(true)
const isSubscribtionTabActive = ref(false)

watch( email , (newValue) => {
  // https://www.iana.org/domains/root/db   .abarth  .alstom  .amazon
  let pattern = /[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,}/
  if (pattern.test(newValue)) {
    mailError.value = false;
  } else {
    mailError.value = true;
  }
})

watch( password , (newValue) => {
  if (newValue.length < 2) {
    passwordError.value = true;
  } else {
    passwordError.value = false;
  }
})

watch( [password, password2] , (newPassword) => {
  // console.log(newPassword1[0], newPassword2) // !!!
  if (newPassword[0] === newPassword[1]) {
    passwordError2.value = false;
  } else {
    passwordError2.value = true;
  }
})

function chooseForm(event) {
  if (event !== undefined){
    if (event.id === "connection"){
      isConnectionTabActive.value = true;
      isSubscribtionTabActive.value = false;
    } else {
      isSubscribtionTabActive.value = true;
      isConnectionTabActive.value = false;
    }
    return isConnectionTabActive, isSubscribtionTabActive 
  }
}

</script>

<template>

  <h1>En cours</h1>
  <form @submit.prevent="connection(email)">

    <div class="tabs">
      <p class="tab" 
        id="connection"
        :class="[ isConnectionTabActive ? 'active' : 'unactive' ]"
        @click="chooseForm($event.target)">
        Connexion
      </p>
      <span class="border-tab"></span>
      <p class="tab"
        id="subscribe"
        :class="[ isSubscribtionTabActive ? 'active' : 'unactive' ]"
        @click="chooseForm($event.target)">
        Inscription
      </p>
    </div>

    <div>
      <label for="email">Email :</label>
      <input
        type="email"
        name="email"
        id="email"
        v-model="email"
        placeholder="Saisissez votre mail"
      />
      <p class="error-message" v-if="mailError">Le mail est mal formé, ex: xx@xx.xx</p>
    </div>

    <div>
      <label for="password">Mot de passe :</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        placeholder="Saisissez votre mot de passe"
      />
      <p class="error-message" v-if="passwordError">Minimum 2 caractères</p>
    </div>

    <div v-if="isSubscribtionTabActive">
      <label for="password2">Confirmer le mot de passe :</label>
      <input
        type="password"
        name="password2"
        id="password2"
        v-model="password2"
        placeholder="Confirmer votre mot de passe"  
      />
      <p class="error-message" v-if="passwordError2">Les mots de passe ne sont pas identiques</p>
    </div>

    <button v-if="isConnectionTabActive" type="submit">Se connecter</button>
    <button v-else>S'inscrire</button>
    <p class="error-message" v-if="errors.error">Nous n'avons pas pu vous identifier, email ou mot de passe erronés</p>
  </form>
</template>

<style scoped>
form{
  margin-top : 3rem;
  padding : 4rem;
}
.tabs{
  width: 50%;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.tab{
  display : inline-block;
  padding: 0.8rem;
  font-size: 2rem;
  width: 49.5%;
  margin: 0 auto;
  text-align: center;
  color : rgb(0, 189, 126);
  cursor: pointer;
}
.border-tab{
  border : 1px solid rgb(0, 189, 126);
  padding: 1.8rem 0 1rem 0;
}
.active{
  color : white;
  cursor: default;
}
.unactive:hover{
  transition: 0.4s;
  background-color: hsla(160, 100%, 37%, 0.2);

}
input,
button,
label,
.error-message {
  display: block;
  font-size: 1.8rem;
  margin: 0 auto;
  text-align: center;
  width: 50%;
  margin: 0 auto;
}
label{
  text-align: left;
}
button,
input {
  padding: 0.7rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
button {
  background-color: rgb(0, 189, 126);
  color: white;
  font-weight: bold;
  border-radius: 4px;
  transition-duration: 0.4s;
  margin-top: 3rem;
  cursor: pointer;
  &:hover {
    background-color: rgb(0, 128, 85);
    transition-duration: 0.4s;
  }
}
.error-message {
  color: rgb(255, 100, 100);
}

@media (max-width: 1100px) {
  .tabs{
    width: 70%;
  }
  input,
  button,
  label {
    font-size: 1.5rem;
    width: 70%;
  }
}

@media (max-width: 800px) {
  .tabs{
    width: 80%;
  }
  input,
  button,
  label {
    font-size: 1.3rem;
    width: 80%;
  }
}

@media (max-width: 650px) {
  form{
    width: 95%;
    padding: 4rem 0 4rem 0;
  }
  .tabs{
    width: 100%;
    font-size : 1rem;
  }
  .tab{
    font-size: 1rem;
  }
  .border-tab{
    padding: 0.8rem 0 0.8rem 0;
  }
  input,
  button,
  label {
    font-size: 1rem;
    width: 100%;
  }
}

</style>
