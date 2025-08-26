// @ts-ignore - vue-router is installed and working
import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore - vue-router is installed and working  
import type { RouteRecordRaw } from "vue-router";
import AboutComponent from "../components/AboutComponent.vue";
import PopularMoviesPage from "../pages/PopularMoviesPage.vue";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import AdminPage from "../pages/AdminPage.vue";
import MyMoviesPage from "../pages/MyMoviesPage.vue";

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
  { 
    path: "/login", 
    name: "Login", 
    component: LoginPage 
  },
  { 
    path: "/admin", 
    name: "Admin", 
    component: AdminPage 
  },
   { 
    path: "/mymovies", 
    name: "MyMovies", 
    component: MyMoviesPage 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
