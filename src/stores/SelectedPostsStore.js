import { defineStore } from "pinia"

export const useSelectedPostsStore = defineStore( "SelectedPostsStore", {

  state: () => {
    let selectedPosts = []
    return { selectedPosts }
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
  }

})