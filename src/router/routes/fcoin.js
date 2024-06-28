/* eslint-disable */
export default [
    {
        path: "/fcoin-shop",
        name: "fcoin-shop",
        meta: {
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "fcoin" */ "@/views/fcoin/FcoinShop.vue"),
    },
];
