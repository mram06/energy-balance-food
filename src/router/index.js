import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "@/views/NotFound";
import LoginPage from "@/views/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import("@/views/MenuView"),
  },
  {
    path: "/programs",
    name: "programs",
    component: () => import("@/views/ProgramsView"),
  },
  {
    path: "/for-whom",
    name: "forWhom",
    component: () => import("@/views/ForWhomView"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: LoginPage,
  },
  {
    path: "/admin-panel",
    name: "adminPanel",
    component: () => import("@/views/AdminPanel"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
