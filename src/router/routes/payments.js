export default [
  {
    path: "/payments",
    name: "payments",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "payments" */ "@/views/payments/Payments.vue"
      ),
  },
  {
    path: "/payments-history",
    name: "payments-history",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "payments_history" */ "@/views/payments-history/PaymentHistory.vue"
      ),
  },
  {
    path: "/auto-payment",
    name: "auto-payment",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "auto_payment" */ "@/views/auto-payment/AutoPayment.vue"
      ),
  },
  {
    path: "/create-auto-payment",
    name: "create-auto-payment",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "create_auto_payment" */ "@/views/auto-payment/components/AddAutoPayment.vue"
      ),
  },
  {
    path: "/edit-auto-payment/:id",
    name: "edit-auto-payment",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "edit_auto_payment" */ "@/views/auto-payment/components/EditAutoPayment.vue"
      ),
  },
  {
    path: "/payment-success",
    name: "payment-success",
    component: () =>
      import(
        /* webpackChunkName: "payment_success" */ "@/views/payments/components/PaymentSuccess.vue"
      ),
  },
  {
    path: "/payment-fail",
    name: "payment-fail",
    component: () =>
      import(
        /* webpackChunkName: "payment_fail" */ "@/views/payments/components/PaymentFail.vue"
      ),
  },
];
