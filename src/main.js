import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faEye } from '@fortawesome/free-regular-svg-icons';
// import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// library.add(faEye, faEyeSlash);

const pinia = createPinia();
const app = createApp(App);
// .component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);
app.use(router);

app.mount('#app');


// npm install --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-regular-svg-icons
// npm install --save @fortawesome/vue-fontawesome@latest-3
