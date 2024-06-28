<template>
<div class="attached_inner">
    <div class="service_title">Կցված քարտեր</div>
    <span class="wallet_block icon_wallet"></span>
    <div class="attach_description">Դուք չունեք ավելացված քարտ</div>
    <div class="add_new">
      <a  class="add_card custom_a" @click="$emit('attachCard')">Կցել <span class="icon_plus"></span></a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>