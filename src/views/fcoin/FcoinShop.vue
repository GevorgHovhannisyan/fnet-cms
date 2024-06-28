<template>
  <div class="fcoin_page">
    <BalanceHistory />
    <Gifts />
  </div>
</template>

<script>
import BalanceHistory from "./components/BalanceHistory.vue";
import Gifts from "./components/Gifts.vue";
export default {
  components: {
    BalanceHistory,
    Gifts,
  },
};
</script>

<style lang="scss">
@import "./fcoin.scss";
</style>
