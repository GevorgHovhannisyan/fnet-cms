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
                  {{ $t("Recovery password") }}
                </div>
              </div>

              <div class="recovery-pass">
                <div class="form_description">
                  {{ $t("Enter the password") }}
                </div>
                <ValidationObserver
                  slim
                  ref="set_pass_validation"
                  v-slot="{ handleSubmit }"
                >
                  <form
                    class="recover-password"
                    @submit.prevent="handleSubmit(submit)"
                  >
                    <ValidationProvider
                      name="password_conf"
                      rules="required|password"
                      vid="confirm"
                      v-slot="{ errors }"
                    >
                      <div
                        class="field_block"
                        :class="{ 'has-error': errors[0] }"
                      >
                        <div class="field_title">
                          {{ $t("Enter the new password") }}
                        </div>
                        <input
                          class="password_field pass_input"
                          :type="passwordType"
                          autocomplete="off"
                          name="password_conf"
                          v-model="password"
                        />
                        <span class="error_hint">
                          <span class="standard_hint">{{ errors[0] }}</span>
                          <span class="individual_hint"
                            >at least 8 characters</span
                          >
                        </span>
                        <span
                          @click="
                            passwordType === 'password'
                              ? (passwordType = 'text')
                              : (passwordType = 'password')
                          "
                          class="icon_show show_pass"
                          :class="{hide_pass: type === 'text'}"
                        ></span>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider
                      rules="required|confirmed:confirm"
                      v-slot="{ errors }"
                    >
                      <div
                        class="field_block"
                        :class="{ 'has-error': errors[0] }"
                      >
                        <div class="field_title">
                          {{ $t("Confirm password") }}
                        </div>
                        <input
                          class="confirm_field pass_input"
                          :type="passwordConfirmType"
                          name="pass_confirm"
                          autocomplete="off"
                          v-model="passwordConfirm"
                        />
                        <span class="error_hint">passwords do not match</span>
                        <span
                          @click="
                            passwordConfirmType === 'password'
                              ? (passwordConfirmType = 'text')
                              : (passwordConfirmType = 'password')
                          "
                          class="icon_show show_pass"
                        ></span>
                      </div>
                    </ValidationProvider>
                    <button class="validate_btn">
                      {{ $t("Submit") }}
                    </button>
                  </form>
                </ValidationObserver>
              </div>
              <div class="bottom_block">
                <router-link
                  v-slot="{ navigate, href }"
                  class="enter_btn"
                  custom
                  to="/verify"
                >
                  <a @click="navigate" :href="href">{{
                    $t("Previous page")
                  }}</a>
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
      password: null,
      passwordConfirm: null,
      passwordType: "password",
      passwordConfirmType: "password",
    };
  },
  computed: {
    forgot_data() {
      return this.$store.getters.forgot_data;
    },
  },
  methods: {
    ...mapActions(["forgotPassword"]),
    async submit() {
      const data = {
        phone: this.forgot_data.phone,
        token: this.forgot_data.token,
        password: this.password,
        password_confirmation: this.passwordConfirm,
      };
      const response = await this.forgotPassword(data);
      if (response.status === 201) {
        this.$router.push("/login").catch(()=>{});;
      }
    },
  },
};
</script>

<style lang="scss">
// @import "@/assets/sass/loginMain.scss";

.recovery-pass {
  .form_description {
    padding-top: 8px;
  }

  // .validate_btn {
  //   margin-top: 95px !important;
  // }
}
</style>
