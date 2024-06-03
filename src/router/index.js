import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "@/views/NotFound";
import { useAuthStore } from "@/store/modules/auth";

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
    component: () => import("@/views/LoginPage"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/LoginPage"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/CartView"),
    meta: { requireAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView"),
    meta: { requireAuth: true },
    children: [
      {
        path: "orders",
        name: "orders",
        component: () => import("@/components/OrdersBlock"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/components/SettingsBlock"),
      },
    ],
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
  mode: "history",
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.user;
  if (to.meta.requireAuth && !isAuthenticated) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
