import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
import routes from "@/router/routes";
import { store } from "@/store";

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [...routes],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isTokenSet = store.getters.isTokenSet;
  if (requiresAuth && !isTokenSet) {
    return next("/login");
  }
  return next();
});

export default router;
