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
                    <li class="count_step" v-for="count in 3" :key="count">
                      <span :class="{ selected: count == reg_step }"></span>
                    </li>
                  </ul>
                </div>
              </div>
              <Step1 />
              <div class="bottom_block" v-if="reg_step !== 3">
                <router-link
                  custom
                  v-slot="{ navigate, href }"
                  class="enter_btn"
                  to="/login"
                >
                  <a @click="navigate" :href="href"> {{ $t("Log in") }}</a>
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
import Step1 from "./sign-up/Step-1.vue";
export default {
  data() {
    return {};
  },
  components: {
    Step1,
  },
  computed: {
    reg_step() {
      return this.$store.getters.regStep;
    },
  },
  created() {},
};
</script>

<style lang="scss">
// @import "@/assets/sass/loginMain.scss";

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
