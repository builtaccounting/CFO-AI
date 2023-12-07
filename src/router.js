import VueRouter from "vue-router";
import Vue from "vue";
import {getAccessToken, getUser} from "@/utils";
import Cookies from "js-cookie";
import store from "@/store";

Vue.use(VueRouter);
const routes = [
  // { path: "*", component: () => import("./components/NotFoundComponent") },
  {
    path: "/login",
    component: () => import("./components/login.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("./components/home.vue"),
    meta: {
      requiresAuth: true, // Set this route to require authentication
    },
  },
  {
    path: "/",
    component: () => import("./components/home.vue"),
  },
  {
    path: "/reports/:id",
    component: () => import("./components/mgmt-report/ReportTemplate.vue"),
    meta: {
      requiresAuth: true, // Set this route to require authentication
    },
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if(!['/', '/login'].includes(to.path)){
  document.title = to.meta?.title
  }else{
  document.title = 'CFO AI By Built'
  }
  next();
})


export default router;
