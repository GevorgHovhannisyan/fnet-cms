<template>
  <div class="success_inner">
    <span class="icon_checked main_icon"></span>
    <div class="success_title">{{ $t(`Email changed`) }}</div>
    <div class="success_description">
      {{ $t(`Thank you for making a payment`) }}
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.body.classList.add("pp_opened");
  },
  destroyed() {
    document.body.classList.remove("pp_opened");
  },
};
</script>

<style>
</style>