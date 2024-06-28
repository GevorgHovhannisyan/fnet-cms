<template>
  <div class="success_page">
    <span class="icon_checked main_icon"></span>
    <div class="success_title">{{ $t(`Payment successed`) }}</div>
    <div class="success_description">
      {{ $t(`Thank you for making a payment`) }}
    </div>
    <a href="" class="back_home">{{ $t(`Home page`) }} </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./style/successPayment.scss";
</style>