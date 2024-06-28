<template>
  <div class="content">
    <div class="login_page login_main">
      <div class="page_container">
        <div class="login_inner">
          <div class="login_block">
            <div class="login_top">
              <Logo />
              <LngSwitcher lngBlock="login_lg" />
            </div>
            <div class="login_form">
              <div class="form_title">
                {{ $t("Log in") }}
              </div>
              <ValidationObserver
                ref="log_validation"
                v-slot="{ handleSubmit }"
                slim
              >
                <form autocomplete="off" @submit.prevent="handleSubmit(login)">
                  <ValidationProvider
                    name="Contract"
                    rules="required"
                    v-slot="{ errors }"
                    slim
                  >
                    <div
                      class="field_block"
                      :class="{ 'has-error': errors[0] }"
                    >
                      <div class="field_title">
                        {{ $t("Contract number") }}
                      </div>
                      <input
                        type="text"
                        name="number"
                        autocomplete="off"
                        new-password="off"
                        placeholder="XX XX XXX"
                        v-model="contract_number"
                        @input="updateValue"
                      />
                      <span class="error_hint">{{ errors[0] }}</span>
                      <span class="icon_info check_input"></span>
                      <!-- icon_success -->
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="password"
                    rules="required"
                    v-slot="{ errors }"
                    slim
                  >
                    <div
                      class="field_block"
                      :class="{ 'has-error': errors[0] }"
                    >
                      <div class="field_title">
                        {{ $t("Password") }}
                      </div>
                      <input
                        :type="type"
                        class="pass_input"
                        name="password"
                        autocomplete="off"
                        v-model="password"
                        placeholder="Ձեր գաղտնաբառը"
                      />
                      <span class="error_hint">{{ errors[0] }}</span>
                      <span
                        @click="
                          type === 'password'
                            ? (type = 'text')
                            : (type = 'password')
                        "
                        :class="{hide_pass: type === 'text'}"
                        class="icon_show show_pass"
                      ></span>
                    </div>
                  </ValidationProvider>

                  <div class="forget_pass">
                    <router-link
                      to="/forgot-password"
                      v-slot="{ navigate, href }"
                      custom
                    >
                      <a @click="navigate" :href="href">{{
                        $t("Forgot password")
                      }}</a>
                    </router-link>
                    <!-- <a href=""></a> -->
                  </div>
                  <ul class="checkbox_list">
                    <li>
                      <label>
                        <span class="checkbox">
                          <input
                            type="checkbox"
                            name="checkboxbutton"
                            v-model="remember_me"
                          />
                          <span class="checkbox_button icon_checked">{{
                            $t("Remember me")
                          }}</span>
                        </span>
                      </label>
                    </li>
                  </ul>
                  <button class="validate_btn">
                    {{ $t("Log in") }}
                  </button>
                </form>
              </ValidationObserver>

              <div class="bottom_block">
                <router-link
                  v-slot="{ navigate, href }"
                  class="enter_btn"
                  custom
                  to="/signup"
                >
                  <a @click="navigate" :href="href">{{ $t("Register") }}</a>
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
      contract_number: null,
      password: null,
      remember_me: false,
      type: "password",
    };
  },
  methods: {
    ...mapActions(["userLogin"]),
    async login() {
      this.$store.commit("SHOW_LOADING", true);
      await this.userLogin({
        contract_number: this.contract_number,
        password: this.password,
        remember: this.remember_me,
      })
        .then(() => {
          this.$router.push("/").catch(()=>{});;
          this.$store.dispatch("getUser");
        })
        .catch((err) => {
          if (err && err.response.data) {
            const error = err.response.data;
            const message = {};
            if (error.contract_number) {
              if (error.contract_number === "The password is incorrect.") {
                message.password = [error.contract_number];
              }
            } else if (error.errors && error.errors.contract_number) {
              message.Contract = error.errors.contract_number;
            }
            this.$refs.log_validation.setErrors(message);
          }
        });
    },
    updateValue() {
      this.contract_number = this.contract_number.replace(/[^+0-9]/g, "");
    },
  },
};
</script>
