import { defineStore } from 'pinia';
import Axios from '../axios/axios-base';

export const usePostsStore = defineStore('PostsStore', {
  state: () => {
    let posts = [];
    let selectedPosts = [];
    return { selectedPosts, posts };
  },
  getters: {
    nbrePosts() {
      return this.selectedPosts.length;
    }
  },
  actions: {
    toggleSelection(article, button) {
      if (this.selectedPosts.includes(article, button)) {
        this.selectedPosts.splice(this.selectedPosts.indexOf(article), 1);
      } else {
        this.selectedPosts.push(article);
      }
    },
    async getPosts() {
      this.posts = await Axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => this.posts = response.data).default;
    }
  }
});
