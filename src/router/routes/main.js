export default [
  {
    path: "/",
    name: "main",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/main/Main.vue"),
  },
];
