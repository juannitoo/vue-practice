import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { authGuard } from '../axios/auth-guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // route level code-splitting
      // this generates a separate chunk (jsonplaceholder.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      path: '/jsonplaceholder',
      name: 'JsonPlaceHolder',
      component: () => import('../views/JsonPlaceHolderView.vue')
    },
    {
      path: '/todo-list',
      name: 'todo-list',
      component: () => import('../views/TodoListView.vue')
    },
    {
      path: '/connexion',
      name: 'connection',
      component: () => import('../views/ConnectionView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      children: [  // s'affiche dans le routerview du parent
        {
          path: 'user/:id',
          name: 'user',
          props: true,
          component: () => import('../views/admin/UserPage.vue')
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next)=> {
  if(to.matched[0].name === 'admin'){
    authGuard();
  }
  next();
});


export default router;
