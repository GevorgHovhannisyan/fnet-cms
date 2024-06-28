<template>
  <div class="payments_page">
    <History />
  </div>
</template>

<script>
import History from "./components/PaymentHistory.vue";
export default {
  components: {
    History,
  },
};
</script>

<style lang="scss">
@import "./payments.scss";
</style>
