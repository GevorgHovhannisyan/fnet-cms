<template>
  <div class="delete_image">
    <div class="change_inner">
      <button
        type="submit"
        class="icon_close close_btn"
        @click="closePopup"
      ></button>
      <div class="change_title section_title">
        {{ text ? text.title : "" }}
      </div>
      <div class="change_description">
        {{ text ? text.description : "" }}
      </div>
      <div class="buttons_row">
        <button type="submit" class="cancel_btn popup_btn" @click="closePopup">
          {{ text ? text.cancel_text : "" }}
        </button>
        <button type="submit" class="active_btn popup_btn" @click="submitPopup">
          {{ text ? text.submit_text : "" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    openPopup: {
      type: Boolean,
    },
    text: {
      type: Object,
    },
  },
  watch: {
    openPopup(val) {
      if (val) {
        document.body.classList.add("delete_avatar_popup");
      }
    },
  },
  methods: {
    closePopup() {
      document.body.classList.remove("delete_avatar_popup");
      this.$emit("closePopup");
    },
    submitPopup() {
      this.$emit("submitAction");
      this.closePopup();
    },
  },
  created() {
    console.log(this.text);
    if (this.openPopup) {
      document.body.classList.add("delete_avatar_popup");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/popup";
</style>
