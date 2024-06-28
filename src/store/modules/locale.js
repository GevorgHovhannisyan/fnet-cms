/* eslint-disable */
import * as types from '@/store/mutation-types'
import i18n from '@/plugins/i18n'
import * as Validator from 'vee-validate'
import axios from 'axios';

const getters = {
  locale: (state) => state.locale,
  languages: (state) => state.languages
}

const actions = {
  setLocale({ commit }, payload) {
    commit(types.SUCCESS, null)
    commit(types.ERROR, null)
    i18n.locale = payload
    Validator.localize(payload)
    window.localStorage.setItem('locale', JSON.stringify(payload))
    commit(types.SET_LOCALE, payload)
    axios.defaults.headers.common["Accept-Language"] =
    JSON.parse(localStorage.getItem("locale")) || "am";
  }
}

const mutations = {
  [types.SET_LOCALE](state, value) {
    state.locale = value
  }
}

const state = {
  locale:
    JSON.parse(localStorage.getItem('locale')) ||
    navigator.language.slice(0, 2) ||
    'am',
  languages: [
    {
      title: 'ENG',
      code: 'en'
    },
    {
      title: 'ՀԱՅ',
      code: 'am'
    },
    {
      title: 'РУС',
      code: 'ru'
    }
  ]
}

export default {
  state,
  getters,
  actions,
  mutations
}
