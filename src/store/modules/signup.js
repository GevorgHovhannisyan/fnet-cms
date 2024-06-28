/* eslint-disable */
import * as types from "@/store/mutation-types";
import api from "@/services/api/signup";

const getters = {
  regStep: (state) => state.regStep,
  reg_data: (state) => state.reg_data,
};

const state = {
  contract_number: null,
  phone: null,
  regStep: localStorage.getItem('reg-step') || 1,
  reg_data: JSON.parse(localStorage.getItem('reg_data')) || null
};

const actions = {
  userSignUp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .userSignUp(payload)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  checkContractNumber({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true)

      api
        .checkContractNumber(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  checkPhoneNumber({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true)

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
  sendPhone({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true)
      api
        .sendPhone(payload)
        .then((response) => {
          commit(types.SET_REG_TOKEN, response.data.token);
          resolve(response);

        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  verifyPhone({ commit }, payload) {
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
};

const mutations = {
  [types.SAVE_CONTRACT_PHONE](state, data) {
    localStorage.setItem('reg_data', JSON.stringify(data))
    state.reg_data = data;
  },
  [types.SET_REG_TOKEN](state, token) {
    let reg_data = JSON.parse(localStorage.getItem('reg_data'));
    reg_data.token = token;
    localStorage.setItem('reg_data', JSON.stringify(reg_data))
    state.reg_data = reg_data;
  },
  
  [types.STEP_UP](state, payload) {
    localStorage.setItem("reg-step", payload);
    state.regStep = payload;
  },
  [types.CLEAR_REG_DATA](state) {
    localStorage.setItem("reg-step", 1);
    state.regStep = 1;
    localStorage.removeItem("reg_data");
    state.reg_data = null;
  },
  
};

export default {
  getters,
  mutations,
  state,
  actions,
};
