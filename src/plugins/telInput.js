import Vue from "vue";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";

const inputOptions = {
  placeholder: "077 12 34 56",
};

Vue.use(VueTelInput, inputOptions);

export default VueTelInput;
