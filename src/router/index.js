import { createRouter, createMemoryHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import DetailPage from "@/components/DetailPage.vue";

const routes = [
    { path: "/", component: HomePage, name: "HomePage" },
    { path: '/detail/:countryCode', name: 'DetailPage', component: DetailPage, props: true }
];

const router = createRouter({
    history: createMemoryHistory(process.env.BASE_URL),
    routes,
});

export default router;

