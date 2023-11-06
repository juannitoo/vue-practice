<script setup>
import { ref, watch } from 'vue';
import router from '../../router/index.js';
import { useUserStore } from '../../stores/UserStore.js';

const UserStore = useUserStore();

const email = ref('');
const password = ref('');
const password2 = ref('');
const isMailError = ref(false);
const isPasswordError = ref(false);
const isPasswordError2 = ref(false);
const errors = ref({ error: false, message: [''] });
const isConnectionTabActive = ref(true);
const isSubscribtionTabActive = ref(false);
const disabledValidationButton = ref(true);
const isMailUsed = ref(false);

// on stop un obs que qd on le crée de manière asynchrone
watch(email, (newValue) => {
  validEmail(newValue);
});

watch(password, (newValue) => {
  if (newValue.length > 0) validPassword(newValue);
});

watch([password, password2], (passwords) => {
  if (passwords[1].length > 0) arePasswordsEqual(passwords);
});

watch([email, password], () => {
  activeValidationButton(email);
});

watch([email, password, password2], () => {
  activeValidationButton(email);
});

async function activeValidationButton(email) {
  // pour la cohérence du bouton je dois appeler cette promesse ici
  // pour que isMailUsed.value ait la bonne valeur
  // sinon le train n'est pas encore passé ...
  await isEmailUsed(email.value);

  if (
    isConnectionTabActive.value === true &&
    !isMailError.value &&
    email.value.length > 1 &&
    !isPasswordError.value &&
    password.value.length > 1
  ) {
    disabledValidationButton.value = false;
  } else if (
    isSubscribtionTabActive.value === true &&
    !isMailUsed.value &&
    !isMailError.value &&
    email.value.length > 1 &&
    !isPasswordError.value &&
    password.value.length > 1 &&
    !isPasswordError2.value &&
    password2.value.length > 1
  ) {
    disabledValidationButton.value = false;
  } else {
    disabledValidationButton.value = true;
  }
}

function onChooseForm(eventTarget) {
  if (eventTarget !== undefined) {
    if (eventTarget.id === 'connection') {
      isConnectionTabActive.value = true;
      isSubscribtionTabActive.value = false;
    } else if (eventTarget.id === 'subscribe') {
      isSubscribtionTabActive.value = true;
      isConnectionTabActive.value = false;
    }
  }
  activeValidationButton(email);
  if (isSubscribtionTabActive.value) isEmailUsed(email.value);
}

async function validEmail(email) {
  if (isSubscribtionTabActive.value) await isEmailUsed(email);

  // https://www.iana.org/domains/root/db   .abarth  .alstom  .amazon
  let pattern = /[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,}/;
  if (pattern.test(email)) {
    isMailError.value = false;
    return true;
  } else {
    isMailError.value = true;
    return false;
  }
}

async function isEmailUsed(email) {
  return await fetch(`http://localhost:3001/api/users/isemailused`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: '*/*'
    },
    body: JSON.stringify({
      email: email
    })
  })
    .then((response) => response.json())
    .then((json) => {
      isMailUsed.value = json.resp;
    });
}

function validPassword(password) {
  // let pattern = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\s]).{8,}$/
  if (password.length > 1) {
    isPasswordError.value = false;
    return true;
  } else {
    isPasswordError.value = true;
    return false;
  }
}

function arePasswordsEqual(passwords) {
  if (passwords[0] === passwords[1]) {
    isPasswordError2.value = false;
    return true;
  } else {
    isPasswordError2.value = true;
    return false;
  }
}

async function connectionFormValidation(email, password, password2) {
  if (isConnectionTabActive.value) {
    if (validEmail(email) && validPassword(password)) {
      UserStore.login(email, password).then(() => {
        router.push({ name: 'user', params: { id: UserStore.user.userId } });
      });
    }
  } else {
    if (validEmail(email) && validPassword(password) && arePasswordsEqual([password, password2])) {
      UserStore.signup(email, password).then(() => {
        router.push({ name: 'user', params: { id: UserStore.user.userId } });
      });
    }
  }
}
</script>

<template>
  <h3>
    En cours en local, pour l'instant le form fonctionne, les validations aussi, il manque
    principalement la gestion du token
  </h3>
  <div>
    <form @submit.prevent="connectionFormValidation(email, password, password2)">
      <div class="tabs">
        <p
          class="tab"
          id="connection"
          :class="[isConnectionTabActive ? 'active' : 'unactive']"
          @click="onChooseForm($event.target)"
        >
          Connexion
        </p>
        <span class="border-tab"></span>
        <p
          class="tab"
          id="subscribe"
          :class="[isSubscribtionTabActive ? 'active' : 'unactive']"
          @click="onChooseForm($event.target)"
        >
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
        <p class="error-message" v-if="isMailError">Le mail est mal formé, ex: xx@xx.xx</p>
        <p class="error-message" v-if="isMailUsed && isSubscribtionTabActive">
          Le mail est déjà utilisé
        </p>
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
        <p class="error-message" v-if="isPasswordError">
          <span>Minimum 2 caractères</span><br /><span>j'aurais pu faire ca:</span><br />
          <span>/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\s]).{8,}$/</span>
        </p>
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
        <p class="error-message" v-if="isPasswordError2">
          Les mots de passe ne sont pas identiques
        </p>
      </div>

      <button
        :disabled="disabledValidationButton"
        class="button"
        :class="disabledValidationButton ? 'disabled' : ''"
        v-if="isConnectionTabActive"
        type="submit"
      >
        Se connecter
      </button>
      <button
        class="button"
        :disabled="disabledValidationButton"
        v-else
        :class="disabledValidationButton ? 'disabled' : ''"
      >
        S'inscrire
      </button>
      <p class="error-message" v-if="errors.error">
        Nous n'avons pas pu vous identifier, email ou mot de passe erronés
      </p>
    </form>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.2rem;
  display: block;
  margin: 0 auto;
  text-align: center;
}
form {
  margin-top: 3rem;
  padding: 4rem;
}
.tabs {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.tab {
  display: inline-block;
  padding: 0.8rem;
  font-size: 2rem;
  width: 49.5%;
  margin: 0 auto;
  text-align: center;
  color: rgb(0, 189, 126);
  cursor: pointer;
}
.border-tab {
  border: 1px solid rgb(0, 189, 126);
  padding: 1.8rem 0 1rem 0;
}
.active {
  color: white;
  cursor: default;
}
.unactive:hover {
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
label {
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
.disabled {
  &:hover {
    background-color: rgb(255, 100, 100);
    cursor: default;
  }
}
.error-message {
  color: rgb(255, 100, 100);
}

@media (max-width: 1100px) {
  .tabs {
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
  .tabs {
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
  form {
    width: 95%;
    padding: 4rem 0 4rem 0;
  }
  .tabs {
    width: 100%;
    font-size: 1rem;
  }
  .tab {
    font-size: 1rem;
  }
  .border-tab {
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
