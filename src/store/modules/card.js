/* eslint-disable */

import * as types from "@/store/mutation-types";
import api from "@/services/api/card.js";

const getters = {
  cards: (state) => state.cards,
  deleteCardText: (state) => state.deleteCardText,
};

const actions = {
  addCard({ commit }, payload) {
    commit(types.SHOW_LOADING, true)

    return new Promise((resolve, reject) => {
      api
        .addCard(payload)
        .then((response) => {
          if (response.data.success) {
            window.location.href = response.data.redirectUrl;
            resolve(response);
    commit(types.SHOW_LOADING, false)

          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCards({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getCards(payload)
        .then((response) => {
          const data = response.data
          if (data.success) {
            commit(types.SET_CARDS, data.cards);
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  removeCard({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .removeCard(payload)
        .then((response) => {
          if (response.status === 204) {
            commit(types.DEL_CARD, payload);
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

const mutations = {
  [types.SET_CARDS](state, value) {
    state.cards = value;
  },
  [types.DEL_CARD](state, id) {
    const index = state.cards.findIndex(c => c.id === id);
    state.cards.splice(index, 1);
  }
};

const state = {
  cards: [],
  deleteCardText: {
    title: "Ցանկանում եք հեռացնել քարտը",
    description: "Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա:",
    submit_text: "Հեռացնել",
    cancel_text: "Չեղարկել",
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
