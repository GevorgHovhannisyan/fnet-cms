export default [
  {
    path: "/service",
    name: "service",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/views/service/Service.vue"),
  },
];
