# vue-practice

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
ou npm run format
```

### Github-pages

```
https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd
```

### Pense-bête

**PINIA** :
Le store, c'est sur le parent et les enfants ne l'interrogent pas, on continue à passer les props.
Les getters ne doivent pas avoir le même nom que la propriété et elle doit interroger le store directement.

```
const selectedPostsStore = useSelectedPostsStore();
const selectedPosts = selectedPostsStore.selectedPosts;

const nbrePosts = selectedPostsStore.nbrePosts   => getter, ne fonctionne pas, pas de reactivité

<ModalItem
  // :nombrePosts="nbrePosts"
  :nombrePosts="selectedPostsStore.nbrePosts"   => fonctionne
  :selectedPosts="selectedPosts"
/>
```
