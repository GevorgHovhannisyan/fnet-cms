import Vue from 'vue';;
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
Vue.prototype.$moment = VueMoment;
Vue.use(VueMoment, {
    moment,
});
export default VueMoment;
