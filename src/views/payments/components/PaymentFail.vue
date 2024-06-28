<template>
  <div class="failed_page">
    <span class="icon_close main_icon"></span>
    <div class="failed_title">{{ $t(`Payment failed`) }}</div>
    <div class="failed_description">{{ $t(`Occured an error`) }}</div>
    <router-link custom class="back_home" to="/" v-slot="{ navigate, href }">
      <a @click="navigate" :href="href">{{ $t(`Main page`) }}</a>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./style/successPayment.scss";
</style>
