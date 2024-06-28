/* eslint-disable */
export default [
    {
        path: "/contracts",
        name: "contracts",
        meta: {
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "contracts" */ "@/views/contracts/Contracts.vue"),
    },
];
