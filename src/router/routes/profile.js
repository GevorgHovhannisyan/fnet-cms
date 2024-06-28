export default [
  {
    path: "/profile",
    name: "profile",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/views/profile/Profile.vue"),
  },
];
