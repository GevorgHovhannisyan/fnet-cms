<template>
  <div class="pp_block email_popup" :class="{ showed: showPopup }">
    <div class="pp_inner">
      <div class="pp_container">
        <button class="pp_close icon_close" @click="$emit('close')"></button>
        <NewEmail @nextStep="step = 2" v-if="step === 1" />
        <EmailCode @success="checkSuccess" v-if="step === 2" />

        <SuccessEmailChange v-if="showSuccess" @close="showSuccess = false" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import NewEmail from "./NewEmail.vue";
import EmailCode from "./EmailCode.vue";
import SuccessEmailChange from "../popups/SuccessEmailChange.vue";

export default {
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      step: null,
      showSuccess: false,
    };
  },
  methods: {
    ...mapActions(["getUser"]),

    async checkSuccess() {
      try {
        this.step = null;
        this.showSuccess = true;

        const { data } = await this.getUser();
        localStorage.setItem("user", JSON.stringify(data));

      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.showPopup) {
      this.step = 1;
    }
  },
  watch: {
    showPopup(val) {
      if (val) {
      this.step = 1;
        document.body.classList.add("popup_opened");

      }
    },
  },
  components: {
    NewEmail,
    EmailCode,
    SuccessEmailChange,
  },
};
</script>
