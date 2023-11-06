import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
  state: () => {
    let user = {};
    let users = [];
    let authenticated = false;
    return { user, users, authenticated };
  },
  getters: {
    consoleLog : (state) => console.log("youhou from UserStore", state.user)
  },
  actions: {
    async login(email, password) {
      this.user = await fetch('http://localhost:3001/api/users/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          "Accept" : "*/*"
        },
        body: JSON.stringify({
          email: email, 
          password: password
        })
      }).then((response) => response.json())
        .then( (user) => this.user = user)
        .then( () => {
          this.saveUserToLocalStorage(this.user);
          this.authenticated = true;
        } )
        .then( () => {return this.user} )
    },
    logout(){
      if(this.user.userId !== "" && this.authenticated === true ){
        this.authenticated = false;
        window.localStorage.removeItem("vue-practice-user");
      }
    },
    async signup(email, password) {
      // if !isEmailUsed
      await fetch('http://localhost:3001/api/users/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          "Accept" : "*/*"
        },
        body: JSON.stringify({
          email: email, 
          password: password
        })
      }).then((response) => response.json())
        .then( (user) => this.user = user)
        .then( () => console.log(this.user))
        .then( () => {
          this.saveUserToLocalStorage(this.user);
          this.authenticated = true;
        } )
        .then( () => {return this.user} )
    },
    async deleteAccount(userId){
      await fetch(`http://localhost:3001/api/users/${this.user.userId}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          "Accept" : "*/*"
        },
        body: JSON.stringify({
          id: userId, 
        })
      }).then((response) => response.json())
        .then( (json) => console.log(json.message))
        .then( () => this.logout() )
    },
    async getUser(){
      await fetch(`http://localhost:3001/api/users/${this.user.userId}`)
        .then((response) => response.json())
    },
    async getUsers() {
      this.users = await fetch(`http://localhost:3001/api/users`)
        .then((response) => response.json()).default;
    },
    async isEmailUsed(){
      await fetch(`http://localhost:3001/api/users/isemailused`)
      .then((response) => response.json())
    },
    saveUserToLocalStorage(user){
      if(this.user.userId !== "" && this.user.token !== "" ){
        window.localStorage.setItem("vue-practice-user", JSON.stringify(user))
      }
    },
  }
});
