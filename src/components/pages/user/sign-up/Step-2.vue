<template>
  <div class="content">
    <div class="login_page registration1">
      <div class="page_container">
        <div class="login_inner">
          <div class="login_block">
            <div class="login_top">
              <Logo />
              <LngSwitcher lngBlock="login_lg" />
            </div>
            <div class="login_form">
              <div class="title_row">
                <div class="form_title">
                  {{ $t("Register") }}
                </div>
                <div class="steps_block">
                  <div class="step_number">
                    {{ $t("Step") }} {{ reg_step }} /
                    <span :class="{ primary: reg_step == 3 }">3</span>
                  </div>
                  <ul>
                    <li v-for="count in 3" :key="count">
                      <span :class="{ selected: count == reg_step }"></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="form_description">
                {{ $t("Enter the phone number") }}
              </div>
              <form @submit.prevent="checkToken" class="reg-step-2">
                <div class="field_row">
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
                </div>
                <div
                  class="time_code"
                  :class="{ custom_a: sendAgain }"
                  @click="sendCode"
                >
                  {{ $t("REG_SEND_AGAIN") }}
                  {{ !sendAgain ? `00:${getTimer}` : "" }}
                </div>
              </form>
              <button
                class="validate_btn"
                type="submit"
                @click="checkToken"
                :class="{ btn_disabled: !code }"
              >
                {{ $t("Next page") }}
              </button>
              <div class="bottom_block">
                <a @click="stepDown" class="enter_btn custom_a">
                  {{ $t("Previous page") }}</a
                >
              </div>
            </div>
          </div>
          <AppStore />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CodeInput from "vue-verification-code-input";

export default {
  data() {
    return {
      code: null,
      sendAgain: true,
      time_counter: 59,
      wrongCode: null,
    };
  },
  components: {
    CodeInput,
  },
  computed: {
    getTimer() {
      return this.time_counter;
    },
    reg_step() {
      return this.$store.getters.regStep;
    },
    reg_data() {
      return this.$store.getters.reg_data;
    },
  },
  methods: {
    ...mapActions(["verifyPhone", "sendPhone"]),
    onChange() {
      this.wrongCode = null;
      this.code = null;
    },
    onComplete(token) {
      this.code = token;
    },

    async checkToken() {
      if (this.code && this.code.toString().length === 4) {
        await this.verifyPhone({
          code: this.code,
          phone: this.reg_data.phone,
          token: this.reg_data.token,
        })
          .then(() => {
            this.$store.commit("STEP_UP", 3);
            this.$router.push("/set-password").catch(()=>{});;
          })
          .catch((err) => {
            if (err.response && err.response.data.error) {
              const message = err.response.data.error.errors.code[0];
              this.wrongCode = message;
            }
          });
      }
    },
    sendCode() {
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
    sendCodePhone() {
      this.sendPhone({
        phone: this.reg_data.phone,
      });
    },
    stepDown() {
      this.$store.commit("STEP_UP", 1);
      this.$router.push("/signUp").catch(()=>{});;
    },
  },
  created() {
    if (!this.reg_data) {
      this.$store.commit("CLEAR_REG_DATA");
      this.$router.push("/signup").catch(()=>{});;
    }
  },
};
</script>

<style lang="scss">
@import "./steps.scss";

.primary {
  color: #4c17d0 !important;
}

@include mediaTo($size480) {
  .reg-step-2 .time_code{
    font-size: 130%;
  }
}
</style>
