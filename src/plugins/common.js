/* eslint-disable */
import Vue from 'vue';
// import Heading from '@/components/common/Heading.vue'
import Logo from '@/components/common/Logo.vue';
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import SuccessMessage from '@/components/common/SuccessMessage.vue';
import SubmitButton from '@/components/common/SubmitButton.vue';
import LngSwitcher from '@/components/common/LanguageSwitcher.vue';
import AppStore from '@/components/common/AppStore.vue';
import Pagination from '@/components/common/Pagination.vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueSlideUpDown from 'vue-slide-up-down';
import PopupConfirm from '@/components/common/PopupConfirm.vue';
import PopupFields from '@/components/common/PopupFields.vue';


// Vue.component('Heading', Heading)
Vue.component('Logo', Logo);
Vue.component('ErrorMessage', ErrorMessage);
Vue.component('Pagination', Pagination);
Vue.component('SuccessMessage', SuccessMessage);
Vue.component('SubmitButton', SubmitButton);
Vue.component('LngSwitcher', LngSwitcher);
Vue.component('AppStore', AppStore);
Vue.component('v-select', vSelect);
Vue.component('vue-slide-up-down', VueSlideUpDown);
Vue.component('PopupConfirm', PopupConfirm);
Vue.component('PopupFields', PopupFields);