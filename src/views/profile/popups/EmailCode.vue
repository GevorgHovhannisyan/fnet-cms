<template>
  <div class="email_code">
    <div class="pp_title">{{ $t(`Enter the code`) }}</div>
    <div class="pp_description">
      {{ $t(`Sended code`) }}
    </div>
    <form>
      <div class="field_block" :class="{ 'has-error': wrongCode }">
        <CodeInput
          name="Code"
          :loading="false"
          class="code_input"
          v-on:complete="onComplete"
          v-on:change="onChange"
          :fields="4"
        />
        <span class="error_hint">{{ wrongCode }}</span>
      </div>
    </form>
   <div
                  class="time_code"
                  @click="sendCodeAgain"
                  :class="{ custom_a: sendAgain }"
                >
                  {{ $t("REG_SEND_AGAIN") }}
                  {{ !sendAgain ? `00:${getTimer}` : "" }}
                </div>
    <div class="btn_block">
      <button class="validate_btn" type="submit" @click="changeEmail">
        {{ $t(`Submit`) }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import CodeInput from "vue-verification-code-input";

export default {
  data() {
    return {
      sendAgain: true,
      time_counter: 59,
      wrongCode: null,
      code: null,
    };
  },
  computed: {
    resetData() {
      return this.$store.getters.userEmailResetData;
    },
      getTimer() {
      return this.time_counter;
    },
  },
  methods: {
    ...mapActions(["verifyEmail"]),

    onChange() {
      this.wrongCode = null;
      this.code = null;
    },
    onComplete(code) {
      this.code = code;
    },
    async changeEmail() {
      const payload = {
        email: this.resetData.email,
        code: this.code,
        token: this.resetData.token,
      };
      try {
        await this.verifyEmail(payload)
          .then(() => {
            this.$emit("success");
          })
          .catch((err) => {
            if (err.response && err.response.data) {
              console.log('err', err.response.data.errors);
              const message = err.response.data.errors.errors.code[0];
              this.wrongCode = message;
            }
          });
        // this.$emit("success");
      } catch (error) {
        console.log(error);
      }
    },
     sendCodeAgain() {
      if (!this.sendAgain) {
        return false;
      } else {
        this.sendAgain = false;
        this.sendCodePhone();
        var downloadTimer = setInterval(() => {
          +this.time_counter--;
          if (+this.time_counter <= 0) {
            clearInterval(downloadTimer);
            this.sendAgain = true;
            this.time_counter = 59;
          }
        }, 1000);
      }
    },
  },
  components: {
    CodeInput,
  },
};
</script>