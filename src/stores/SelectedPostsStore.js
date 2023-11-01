import { defineStore } from "pinia"

export const useSelectedPostsStore = defineStore( "SelectedPostsStore", {

  state: () => {
    let posts = []
    let selectedPosts = []
    return { selectedPosts, posts }
  },
  getters: {
    nbrePosts() {
      return this.selectedPosts.length;
    },
  },
  actions: {
    toggleSelection(article, button){
      if (this.selectedPosts.includes(article, button)) {
        this.selectedPosts.splice(
          this.selectedPosts.indexOf(article), 
          1
        );
      } else {
        this.selectedPosts.push(article);
      }
    },
    async getPosts(){
      this.posts = await (fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => { this.posts = json })
      ).default;
    }

  }
})