/* eslint-disable */

import * as types from "@/store/mutation-types";
import api from "@/services/api/forgotPassword";
// import { buildSuccess, handleError } from "@/utils/utils.js"

const getters = {
  resetEmailSent: (state) => state.resetEmailSent,
  forgot_data: (state) => state.forgot_data,
};

const actions = {
  forgotPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true);
      api
        .forgotPassword(payload)
        .then((response) => {
          if (response.status === 201) {
            commit(types.RESET_EMAIL_SENT, true);
            // buildSuccess(
            //   {
            //     msg: "forgotPassword.RESET_EMAIL_SENT",
            //     params: [payload.email],
            //     timeout: 0
            //   },
            //   commit,
            //   resolve
            // )
            resolve(response);
          }
        })
        .catch((error) => {
          // handleError(error, commit, reject)
          reject(error);
        });
    });
  },
  verifyForgotPhone({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true)

      api
        .verifyPhone(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  sendPhoneForgot({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true)
      api
        .sendPhone(payload)
        .then((response) => {
          commit(types.SET_FORGOT_TOKEN, response.data.token);
          resolve(response);

        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  checkForgotPhoneNumber({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .checkPhoneNumber(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  setNewPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .setNewPassword(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
};

const mutations = {
  [types.RESET_EMAIL_SENT](state, value) {
    state.resetEmailSent = value;
  },
  [types.SAVE__FORGOT_CONTRACT_PHONE](state, data) {
    localStorage.setItem('forgot_data', JSON.stringify(data))
    state.forgot_data = data;
  },

  [types.SET_FORGOT_TOKEN](state, token) {
    let forgot_data = JSON.parse(localStorage.getItem('forgot_data'));
    forgot_data.token = token;
    localStorage.setItem('forgot_data', JSON.stringify(forgot_data))
    state.forgot_data = forgot_data;
  },
};

const state = {
  resetEmailSent: false,
  forgot_data: JSON.parse(localStorage.getItem('forgot_data')) || null
};

export default {
  state,
  getters,
  actions,
  mutations,
};
