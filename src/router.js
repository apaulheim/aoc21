import VueRouter from "vue-router";
import Calendar from "./Calendar";
import Day from "./Day";

const routes = [
  { path: "/day/:id", component: Day },
  { path: "/", component: Calendar },
];

const router = new VueRouter({
  routes,
});

export default router;
