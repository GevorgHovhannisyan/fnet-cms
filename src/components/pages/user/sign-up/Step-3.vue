<template>
  <div class="content">
    <div class="login_page registration4">
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

              <div class="step-3">
                <div class="welcome_block">
                  {{ $t("Welcome") }}
                  <!-- <span>Պետրոս Պողոսյան.</span> -->
                </div>
                <div class="form_description">
                  {{ $t("Enter the password") }}
                </div>
                <ValidationObserver
                  ref="set_pass_validation"
                  v-slot="{ handleSubmit }"
                >
                  <form
                    class="reg-step-3"
                    @submit.prevent="handleSubmit(submit)"
                  >
                    <ValidationProvider
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
                          name="reg_pass"
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
                          :class="{ hide_pass: type === 'text' }"
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
    reg_step() {
      return this.$store.getters.regStep;
    },
    reg_data() {
      return this.$store.getters.reg_data;
    },
  },
  methods: {
    ...mapActions(["userSignUp"]),

    async submit() {
      const userData = {
        contract_number: this.reg_data.contract_number,
        phone: this.reg_data.phone,
        token: this.reg_data.token,
        password: this.password,
        password_confirmation: this.passwordConfirm,
      };
      const response = await this.userSignUp(userData);
      if (response.status === 201) {
        this.$router.push("/login").catch(() => {});
        this.$store.commit("CLEAR_REG_DATA");
      }
    },
  },
  created() {
    if (!this.reg_data) {
      this.$store.commit("CLEAR_REG_DATA");

      this.$router.push("/signup").catch(() => {});
    }
  },
};
</script>


<style lang="scss">
@import "./steps.scss";

.primary {
  color: #4c17d0 !important;
}

@include mediaTo($size576) {
  .layout--full-page .login_page.registration4 .login_form button {
    margin-top: 25px;
  }
}
</style>
