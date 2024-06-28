import Vue from "vue";
import "@/plugins/axios";
import "@/plugins/common";
import "@/plugins/veevalidate";
import "@/plugins/telInput";
import "@/plugins/vuetify";
import "@/plugins/moment";
import i18n from "@/plugins/i18n";
import App from "./App.vue";
import router from "@/router";
import { store } from "@/store";
import titleMixin from "./mixin/titleMixin";
import checkDevice from "./mixin/checkDevice";
import translation from "./mixin/translation";
Vue.mixin(titleMixin);

import Paginate from "vuejs-paginate";
Vue.component("paginate", Paginate);

import "@/assets/sass/main.scss";
import "@/assets/sass/loading.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  mixins: [checkDevice, translation],
  render: (h) => h(App),
  created() {
    store.dispatch("setLocale", store.getters.locale);
  },
}).$mount("#app");
