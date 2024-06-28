<template>
  <div class="empty_page">
    <span class="icon_union main_icon"></span>
    <div class="empty_title">{{ $t(`No auto payment`) }}</div>
    <div class="empty_description">{{ $t(`Add auto payment`) }}</div>
      <router-link custom class="custom_a" to="/create-auto-payment" v-slot="{ navigate }">
          <a  @click="navigate" class="auto_payment">
      {{ $t(`Add auto payment`) }}<span class="icon_plus"></span
    ></a>
      </router-link>
  
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./style/emptyPayment.scss";
</style>
