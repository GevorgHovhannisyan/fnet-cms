<template>
  <div class="content">
    <div class="login_page reset_password">
      <div class="page_container">
        <div class="login_inner">
          <div class="login_block">
            <div class="login_top">
              <Logo />
              <LngSwitcher lngBlock="login_lg" />
            </div>
            <div class="login_form">
              <div class="form_title">{{ $t("Recovery password") }}</div>
              <div class="form_description">
                {{ $t("Enter the phone number") }}
              </div>
              <ValidationObserver ref="recovery_pass" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(sendCode)">
                  <ValidationProvider name="phone" v-slot="{ errors }">
                    <div
                      class="field_block"
                      :class="{ 'has-error': errors[0] }"
                    >
                      <div class="field_title">{{ $t("Phone number") }}</div>
                      <vue-tel-input
                        type="tel"
                        name="phone"
                        autoFormat
                        :custom-validate="/^[0-9 ]*$/"
                        @input="checkNumber"
                        @validate="validatePhone"
                      ></vue-tel-input>
                      <span class="error_hint">{{ errors[0] }}</span>
                      <span class="icon_info check_input"></span>
                    </div>
                  </ValidationProvider>

                  <div class="info_block">
                    {{ $t("An SMS notification will be sent to the phone number") }}
                  </div>
                  <button class="validate_btn">Ուղարկել կոդը</button>
                </form>
              </ValidationObserver>
              <div class="bottom_block">
                <router-link
                  custom
                  to="/login"
                  class="enter_btn"
                  v-slot="{ navigate, href }"
                >
                  <a :href="href" @click="navigate">
                    {{ $t("Previous page") }}
                  </a>
                </router-link>
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
export default {
  data() {
    return {
      phone: null,
      wrong_phone: null,
    };
  },
  computed: {
    forgot_data() {
      return this.$store.getters.forgot_data;
    },
  },
  methods: {
    ...mapActions(["checkForgotPhoneNumber", "sendPhoneForgot"]),

    checkNumber(event) {
      this.$refs.recovery_pass.reset();
      this.phone = event;
    },
    sendCodePhone() {
      this.sendPhoneForgot({
        phone: this.phone,
      }).then((res) => {
        if (res.data.success) {
          this.$router.push("/verify").catch(()=>{});;
        }
      });
    },
    sendCode() {
      this.checkForgotPhoneNumber({
        phone: this.phone,
      })
        .then((res) => {
          if (res.status === 200) {
            this.$store.commit("SAVE__FORGOT_CONTRACT_PHONE", {
              phone: this.phone,
            });

            this.sendCodePhone();
          }
        })
        .catch((err) => {
          if (err && err.response.data) {
            const error = err.response.data.errors;
            this.$refs.recovery_pass.setErrors(error);
          }
        });
    },
    validatePhone(event) {
      if (event.valid) {
        this.phone = event.number;
      }
    },
  },
};
</script>
