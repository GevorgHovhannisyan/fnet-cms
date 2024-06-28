<template>
  <li>
    <div class="item_inner change_pass">
      <div class="service_title">{{ $t(`Change password`) }}</div>
      <div class="section_description">
        {{ $t(`Password required`) }}
      </div>
      <ValidationObserver
        slim
        ref="change_pass_validation"
        v-slot="{ handleSubmit }"
      >
        <form @submit.prevent="handleSubmit(changePassword)">
          <ValidationProvider
            name="old_password"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="field_block" :class="{ 'has-error': errors[0] }">
              <div class="field_title">{{ $t(`Old password`) }}</div>
              <input
                class="last_password"
                type="password"
                autocomplete="off"
                v-model="old_password"
                name="reg_pass"
              />
              <span class="error_hint">
                <span class="standard_hint">{{ errors[0] }}</span>
                <span class="individual_hint">at least 8 characters</span>
              </span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="password_conf"
            rules="required|password"
            vid="confirm"
            v-slot="{ errors }"
          >
            <div class="field_block" :class="{ 'has-error': errors[0] }">
              <div class="field_title">{{ $t(`New password`) }}</div>
              <input
                class="password_field"
                type="password"
                autocomplete="off"
                name="reg_pass"
                v-model="password"
              />
              <span class="error_hint">
                <span class="standard_hint">{{ errors[0] }}</span>
                <span class="individual_hint">at least 8 characters</span>
              </span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            rules="required|confirmed:confirm"
            v-slot="{ errors }"
          >
            <div class="field_block" :class="{ 'has-error': errors[0] }">
              <div class="field_title">
                {{ $t(`Confirm new password`) }}
              </div>
              <input
                class="confirm_field"
                type="password"
                name="pass_confirm"
                autocomplete="off"
                v-model="passwordConfirm"
              />
              <span class="error_hint">passwords do not match</span>
            </div>
          </ValidationProvider>

          <button class="validate_btn change_pass">
            {{ $t(`Change password`) }}
          </button>
        </form>
      </ValidationObserver>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      old_password: null,
      password: null,
      passwordConfirm: null,
      passwordType: "password",
      passwordConfirmType: "password",
    };
  },
  methods: {
    ...mapActions(["changeMyPassword", "getNotifications"]),
    async changePassword() {
      const data = {
        current_password: this.old_password,
        password: this.password,
        password_confirmation: this.passwordConfirm,
      };

      try {
      this.$store.commit("SHOW_LOADING", true);

        const response = await this.changeMyPassword(data);
        if (response && response.data.success) {
          this.old_password = null;
          this.password = null;
          this.passwordConfirm = null;
          this.$refs.change_pass_validation.reset();
        }
        await this.getNotifications();

      } catch (error) {
        if (error.response.data) {
          const err = error.response.data;

          this.$refs.change_pass_validation.setErrors({
            old_password: [err.message],
          });
        }
      }
    },
  },
};
</script>
