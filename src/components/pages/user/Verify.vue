<template>
  <div class="content">
    <div class="login_page verify_forgot">
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
                  {{ $t("Recovery password") }}
                </div>
              </div>
              <div class="form_description">
                {{ $t("Enter the phone number") }}
              </div>
              <form @submit.prevent="checkToken" class="verify-token">
                <div class="field_row">
                  <div
                    class="field_block"
                    :class="{ 'has-error': wrongCode }"
                  >
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
                  @click="sendCodeAgain"
                  :class="{ custom_a: sendAgain }"
                >
                  {{ $t("REG_SEND_AGAIN") }}
                  {{ !sendAgain ? `00:${getTimer}` : "" }}
                </div>
              </form>
              <button
                  class="validate_btn"
                  type="submit"
                  :class="{ btn_disabled: !code }"
                  @click="checkToken"
                >
                  {{ $t("Next page") }}
                </button>
              <div class="bottom_block">
                <router-link
                  class="enter_btn"
                  v-slot="{ navigate, href }"
                  custom
                  to="/forgot-password"
                >
                  <a @click="navigate" :href="href">{{
                    $t("Previous page")
                  }}</a></router-link
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
    forgot_data() {
      return this.$store.getters.forgot_data;
    },
  },
  methods: {
    ...mapActions(["verifyForgotPhone", "sendPhoneForgot"]),
    onChange() {
      this.wrongCode = null;
      this.code = null;
    },
    onComplete(code) {
      this.code = code;
    },

    async checkToken() {
      if (this.code && this.code.toString().length === 4) {
        await this.verifyForgotPhone({
          code: this.code,
          phone: this.forgot_data.phone,
          token: this.forgot_data.token,
        })
          .then((res) => {
            if (res.data.success) {
              this.$router.push("/reset-password").catch(()=>{});;
            }
          })
          .catch((err) => {
            if (err.response && err.response.data.error) {
              const message = err.response.data.error.errors.code[0];
              this.wrongCode = message;
            }
          });
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
    sendCodePhone() {
      this.sendPhoneForgot({
        phone: this.forgot_data.phone,
      });
    },
    sendCode() {
      if (!this.sendAgain) {
        return false;
      } else {
        this.sendAgain = false;
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
};
</script>

<style lang="scss">
@import "../../../assets/sass/imports/main/variables";
@import "../../../assets/sass/imports/main/mixins";
.verify_forgot {
  .time_code {
    margin-bottom: auto;
    display: flex;
    justify-content: flex-end;
    font-size: 140%;
    line-height: 1.25em;
    text-align: center;
    text-decoration-line: underline;
    color: #4d4d4d;
    padding-top: 24px;
    @include mediaTo($size480) {
      font-size: 130%;
    }
  }
  
  .field_block {
    width: 100%;
    padding: unset !important;
    flex: unset !important;
    max-width: 100% !important;
  }

  .code_input {
    display: flex;
    justify-content: center;
    width: 100% !important;

    .react-code-input {
      input {
        height: 68px !important;
        border: 1px solid #e9e4f7 !important;
        width: 100% !important;
        max-width: 20.6%;
        flex: 0 0 20.6%;
        margin: 0 8px;
        border-radius: 8px;
      }

      @include mediaTo($size480) {
        padding: 15px 0 0;
        input{
          height: 68px !important;
          width: 68px !important;
          padding: 10px;
        }
      }
      @include mediaTo($size400) {
        input{
          height: 60px !important;
          width: 60px !important;
          padding: 5px;
          margin: 0px 5px;
        }
      }
      @include mediaTo($size360) {
        input{
          height: 55px !important;
          width: 55px !important;
        }
      }
    }
  }
}
</style>
