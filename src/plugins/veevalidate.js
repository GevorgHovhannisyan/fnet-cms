/* eslint-disable */
import Vue from 'vue'
import * as VeeValidate from 'vee-validate'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import en from '../locales/en'
import am from '../locales/am'

import { localize, extend } from 'vee-validate'
import { required, email, min, confirmed } from 'vee-validate/dist/rules'

// The types of validators used in the project
extend('required', required)
extend('confirmed', confirmed)
extend('email', email)
extend('min', min)
extend('url', {
  validate: (str) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    return !!pattern.test(str)
  }
})

extend('password', {
  validate: (string) => {
    if (!/\d/.test(string)) {
      return "Password field must have number"
    } else if (!/[A-Z]/.test(string)) {
      return "Password field must have upper case letter"
    } else if (!/[a-z]/.test(string)) {
      return "Password field must have lower case letter"
    } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(string)) {
      return "Password field must have special character"
    } else if (string.length < 8) {
      return "Password field must have min 8 character"
    } else {
      return true
    }

  }
})

localize({
  en,
  am
})

Vue.use(VeeValidate, {errorBagName: 'vErrors'})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
export default VeeValidate
