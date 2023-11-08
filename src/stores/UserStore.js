import { defineStore } from 'pinia';
import Axios from '../axios/axios-base';

export const useUserStore = defineStore('UserStore', {
  state: () => {
    let user = {};
    let users = [];
    let isAuthenticated = false;
    return { user, users, isAuthenticated };
  },
  getters: {
    consoleLog: (state) => console.log('youhou from UserStore', state.user)
  },
  actions: {
    async login(email, password) {
      this.user = await Axios.post('/api/users/login', {
        email: email,
        password: password
      }).then((response) => (this.user = response.data))
        .then(() => {
          this.saveTokenToLocalStorage(this.user.token);
          this.isAuthenticated = true;
        })
        .then(() => {
          return this.user;
        })
        .catch((err) => console.log("erreur axios login :", err));
    },
    logout() {
      if (this.user.userId !== '' && this.isAuthenticated === true) {
        this.isAuthenticated = false;
        window.localStorage.removeItem('vue-practice-user-token');
        this.user = {}
      }
    },
    async signup(email, password) {
      this.user = await Axios.post('/api/users/signup', {
        email: email,
        password: password
      }).then((response) => this.user = response.data)
        .then(() => {
          this.saveTokenToLocalStorage(this.user);
          this.isAuthenticated = true;
        })
        .then(() => {
          return this.user;
        })
        .catch((err) => console.log("erreur axios signup :", err));
    },
    async deleteAccount(userId) {
      await Axios.delete(`api/users/${this.user.userId}`, {
          id: userId
        }).then(() => this.logout())
          .catch((err) => console.log("erreur axios signup :", err));
    },
    async getUser() {
      await Axios.get(`http://localhost:3001/api/users/${this.user.userId}`)
      .then((response) => response.data ).default;
    },
    async getUsers() {
      this.users = await Axios.get(`http://localhost:3001/api/users`)
      .then((response) => response.data ).default;
    },
    saveTokenToLocalStorage(token) {
      if (this.user.userId !== '' && this.user.token !== '') {
        window.localStorage.setItem('vue-practice-user-token', JSON.stringify(token));
      }
    }
  }
});
