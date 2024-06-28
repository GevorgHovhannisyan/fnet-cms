<template>
  <div class="change_email">
    <div class="pp_title">{{ $t(`Set email and password`) }}</div>
    <div class="pp_description">
      Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ
      տեքստի ձևավորման վրա:
    </div>
    <ValidationObserver slim ref="change_email" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(sendEmailCode)" autocomplete="off" >
        <ValidationProvider
          name="email"
          rules="required|email"
          v-slot="{ errors }"
        >
          <div class="field_block" :class="{ 'has-error': errors[0] }">
            <div class="field_title">{{ $t(`Email`) }}</div>
            <input
              type="text"
              v-model="email"
              name="name"
              autocomplete="new-password"
              placeholder="Էլ-փոստի հասցե"
              data-validation="email"
            />
            <span class="error_hint">
              <span class="standard_hint">{{ errors[0] }}</span>

              <span class="individual_hint">սխալ էլ. հասցե</span>
            </span>
          </div>
        </ValidationProvider>
        <ValidationProvider name="password" v-slot="{ errors }">
          <div class="field_block" :class="{ 'has-error': errors[0] }">
            <div class="field_title">{{ $t(`Your password`) }}</div>
            <input
              class="last_password"
              :type="type"
              autocomplete="new-password"
              placeholder="Գաղտնաբառ"
              name="reg_pass"
              v-model="password"
              data-validation="length"
              data-validation-length="min8"
            />
            <span
              class="icon_show show_pass"
              @click="
                type === 'password' ? (type = 'text') : (type = 'password')
              "
              :class="{ hide_pass: type === 'text' }"
            ></span>
            <span class="error_hint">
              <span class="standard_hint">{{ errors[0] }}</span>
              <span class="individual_hint">at least 8 characters</span>
            </span>
          </div>
        </ValidationProvider>

        <div class="btn_block">
          <button class="validate_btn" type="submit">{{ $t(`Submit`) }}</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: null,
      password: null,
      type: "password",
    };
  },

  methods: {
    ...mapActions(["changeMyEmail"]),

    async sendEmailCode() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      try {
        const { data } = await this.changeMyEmail(payload);
        if (data.success) {
          this.$emit("nextStep");
        }
      } catch (error) {
        if(error && error.response && error.response.data) {
          console.log('error.response.data', error.response.data);
          const err = error.response.data;

          if(err.errors) {
            this.$refs.change_email.setErrors(err.errors);

            console.log('351', err.errors);
          }

        }
        console.log(error);
      }
    },
  },
};
</script>
