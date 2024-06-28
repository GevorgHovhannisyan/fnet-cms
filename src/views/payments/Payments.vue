<template>
  <div class="choose_payment_page">
    <ChooseService @toPayment="step = 2" v-if="step === 1" />
    <Payment v-if="step === 2" />
  </div>
</template>

<script>
import ChooseService from "./components/ChooseService";
import Payment from "./components/Payment";

export default {
  data() {
    return {
      step: 1
    }
  },
  components: {
    ChooseService,
    Payment
  },
};
</script>

<style lang="scss">
@import "./payments.scss";
</style>
