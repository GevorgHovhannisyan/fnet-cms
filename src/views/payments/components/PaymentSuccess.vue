<template>
  <div class="payment_success_page">
    <span class="icon_checked main_icon"></span>
    <div class="success_title">{{ $t(`Payment successed`) }}</div>
    <div class="success_description">
      {{ $t(`Thank you for making a payment`) }}
    </div>
    <router-link custom class="back_home custom_a" to="/" v-slot="{ navigate }">
      <a @click="navigate"> {{ $t(`Main page`) }}</a>
    </router-link>
  </div>
</template>

<style lang="scss">
@import "./style/successPayment.scss";
</style>
