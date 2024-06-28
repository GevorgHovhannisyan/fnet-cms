<template>
  <div :class="className">
    <div class="change_inner">
      <button
        type="submit"
        class="icon_close close_btn"
        @click="closePopup"
      ></button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    openPopup: {
      type: Boolean,
    },
    className: {
      type: String,
      default: "change_fcoin",
    },
  },
  watch: {
    openPopup(val) {
      if (val) {
        document.body.classList.add("popup_opened");
      }
    },
  },
  methods: {
    closePopup() {
      document.body.classList.remove("popup_opened");
      this.$emit("closePopup");
    },
  },
  created() {
    if (this.openPopup) {
      document.body.classList.add("popup_opened");
    }
  },
};
</script>

<style lang="scss">
@import "../../assets/sass/popup";
</style>
