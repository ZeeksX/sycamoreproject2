import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import DetailPage from "../views/DetailPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/:name",
    name: "Detail",
    component: DetailPage,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
