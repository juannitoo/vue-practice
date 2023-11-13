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
    consoleLog: (state) => console.log('UserStore', state.user),
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
          // console.log(this.user)
          localStorage.setItem("vue-practice-user", JSON.stringify(this.user))
        })
        .then(() => {
          return this.user;
        })
        .catch((err) => console.log("erreur axios login :", err));
    },
    logout() {
      this.isAuthenticated = false;
      window.localStorage.removeItem('vue-practice-user-token');
      window.localStorage.removeItem('vue-practice-user');
      this.user = {}
    },
    getToken(){
      return localStorage.getItem('vue-practice-user-token')
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
    getUserFromLocalStorage(){
      this.user = JSON.parse(localStorage.getItem('vue-practice-user'))
      console.log("getUserFromLocalStorage", this.user)
      this.isAuthenticated = true;
      return this.user
    },
    async getUsers() {
      this.users = await Axios.get(`http://localhost:3001/api/users`)
      .then((response) => this.users = response.data ).default;
    },
    saveTokenToLocalStorage(token) {
      if (this.user.userId !== '' && this.user.token !== '') {
        window.localStorage.setItem('vue-practice-user-token', JSON.stringify(token));
      }
    }
  }
});
