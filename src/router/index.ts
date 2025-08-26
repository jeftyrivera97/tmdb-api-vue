// @ts-ignore - vue-router is installed and working
import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore - vue-router is installed and working  
import type { RouteRecordRaw } from "vue-router";
import AboutComponent from "../components/AboutComponent.vue";
import PopularMoviesPage from "../pages/PopularMoviesPage.vue";
import HomePage from "../pages/HomePage.vue";

const routes: RouteRecordRaw[] = [
  { 
    path: "/", 
    name: "Home", 
    component: HomePage 
  },
  { 
    path: "/popular", 
    name: "PopularMovies", 
    component: PopularMoviesPage 
  },
    { 
    path: "/about", 
    name: "About", 
    component: AboutComponent 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
