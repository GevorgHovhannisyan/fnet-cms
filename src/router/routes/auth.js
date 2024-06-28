/* eslint-disable */ 
export default [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/components/pages/user/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '@/components/pages/user/SignUp.vue')
  },
  {
    path: '/verify-phone',
    name: 'verify-phone',
    component: () =>
      import(/* webpackChunkName: "signup" */ '@/components/pages/user/sign-up/Step-2.vue')
  },
  {
    path: '/set-password',
    name: 'set-password',
    component: () =>
      import(/* webpackChunkName: "signup" */ '@/components/pages/user/sign-up/Step-3.vue')
  },
  
  {
    path: '/verify',
    name: 'verify',
    component: () =>
      import(/* webpackChunkName: "verify" */ '@/components/pages/user/Verify.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () =>
      import(
        /* webpackChunkName: "forgotPassword" */ '@/components/pages/user/ForgotPassword.vue'
      )
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: () =>
      import(
        /* webpackChunkName: "resetPassword" */ '@/components/pages/user/ResetPassword.vue'
      )
  }
]
