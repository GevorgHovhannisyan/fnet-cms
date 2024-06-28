/* eslint-disable */
import * as types from "@/store/mutation-types";
import api from "@/services/api/profile";
// import { buildSuccess, handleError } from "@/utils/utils.js"

const getters = {
  profile: (state) => state.profile,
  user_data: (state) => state.user,
  image_remove_text: (state) => state.image_remove_text,
  userEmailResetData: (state) => state.userEmailResetData,
  notifications: (state) => state.notifications,
  translations: (state) => state.translations,
};

const actions = {
  changeMyPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .changeMyPassword(payload)
        .then((response) => {
          if (response.status === 200) {

          }
          resolve(response);
          commit(types.SHOW_LOADING, false);

        })
        .catch((error) => {
          reject(error);
          commit(types.SHOW_LOADING, false);

        });
    });
  },
  getTranslations({ commit }) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true);
      api
        .getTranslations()
        .then((response) => {
          localStorage.setItem("translations", JSON.stringify(response.data));
          commit(types.SET_TRANSLATIONS, response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          // handleError(error, commit, reject)
        });
    });
  },
  getNotifications({ commit }) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true);
      api
        .getNotifications()
        .then((response) => {
          commit(types.SET_NOTIFICATIONS, response.data.data)
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  markRead({ commit }, id) {
    return new Promise((resolve, reject) => {
      api
        .markRead(id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  markAllRead() {
    return new Promise((resolve, reject) => {
      api
        .markAllRead()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  changeUserEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true);
      api
        .changeUserInfo(payload, state.user.id)
        .then((response) => {
          if (response.data.success) {
            const user = JSON.parse(localStorage.getItem("user"));
            user.email = payload.email;
            localStorage.setItem("user", JSON.stringify(user));
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  changeImage({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append("image", payload);

      api
        .changeImage(formData, state.user.id)
        .then((response) => {
          if (response.data.success) {
            commit(types.SET_USER_IMAGE, response.data.image)
            resolve(response);
          }
          commit(types.SHOW_LOADING, false);

        })
        .catch((error) => {
          reject(error);
          commit(types.SHOW_LOADING, false);

        });
    });
  },
  deleteImage({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .deleteImage(state.user.id)
        .then((response) => {
          if (response.data.success) {


            commit(types.DELETE_IMAGE)
            // const user = JSON.parse(localStorage.getItem("user"));
            // user.email = payload.email;
            // localStorage.setItem("user", JSON.stringify(user));
          }
          resolve(response);
          commit(types.SHOW_LOADING, false);
        })
        .catch((error) => {
          reject(error);
          commit(types.SHOW_LOADING, false);
        });
    });
  },
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getUser()
        .then((response) => {
          if (response.status === 200) {
            commit(types.SET_USER_DATA, response.data);
            // buildSuccess(null, commit, resolve)
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
          // handleError(error, commit, reject)
        });
    });
  },
  saveProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true);
      api
        .saveProfile(payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_PROFILE, response.data);
            // buildSuccess(
            //   {
            //     msg: "myProfile.PROFILE_SAVED_SUCCESSFULLY"
            //   },
            //   commit,
            //   resolve
            // )
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
          // handleError(error, commit, reject)
        });
    });
  },
  changeMyEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true);
      api
        .changeMyEmail(payload)
        .then((response) => {
          if (response.data.success) {

            commit(types.SET_EMAIL_RESET_DATA, { email: payload.email, token: response.data.token });
            // buildSuccess(
            //   {
            //     msg: "myProfile.PROFILE_SAVED_SUCCESSFULLY"
            //   },
            //   commit,
            //   resolve
            // )
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
          // handleError(error, commit, reject)
        });
    });
  },
  verifyEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true);
      api
        .verifyEmail(payload)
        .then((response) => {
          // if (response.data.success) {

          // commit(types.SET_EMAIL_RESET_DATA, { email: payload.email, token: response.data.token });
          // buildSuccess(
          //   {
          //     msg: "myProfile.PROFILE_SAVED_SUCCESSFULLY"
          //   },
          //   commit,
          //   resolve
          // )
          resolve(response);
          // }
        })
        .catch((error) => {
          reject(error);
          // handleError(error, commit, reject)
        });
    });
  },

  addProfileData({ commit }, data) {
    commit(types.ADD_PROFILE_DATA, data);
  },
};

const mutations = {
  [types.FILL_PROFILE](state, data) {
    state.profile.verified = data.verified;
    state.profile.name = data.name;
    state.profile.email = data.email;
    state.profile.phone = data.phone;
    state.profile.city = data.city;
    state.profile.country = data.country;
    state.profile.urlTwitter = data.urlTwitter;
    state.profile.urlGitHub = data.urlGitHub;
  },
  [types.ADD_PROFILE_DATA](state, data) {
    switch (data.key) {
      case "name":
        state.profile.name = data.value;
        break;
      case "phone":
        state.profile.phone = data.value;
        break;
      case "city":
        state.profile.city = data.value;
        break;
      case "country":
        state.profile.country = data.value;
        break;
      default:
        break;
    }
  },
  [types.DELETE_IMAGE](state) {
    const user = JSON.parse(localStorage.getItem("user"));
    user.image = null;
    user.image_name = null;

    localStorage.setItem("user", JSON.stringify(user));

    state.user.image = null;
    state.user.image_name = null;
  },
  [types.SET_USER_IMAGE](state, image) {
    const user = JSON.parse(localStorage.getItem("user"));
    user.image = image;
    user.image_name = image;
    localStorage.setItem("user", JSON.stringify(user));
    state.user.image = image;
    state.user.image_name = image;
  },
  [types.SET_EMAIL_RESET_DATA](state, payload) {
    state.userEmailResetData = payload;
  },
  [types.SET_USER_DATA](state, payload) {
    state.user = payload;
    localStorage.setItem("user", JSON.stringify(payload));
  },
  [types.SET_NOTIFICATIONS](state, payload) {
    state.notifications = payload;
  },
  [types.SET_TRANSLATIONS](state, payload) {
    state.translations = payload;
  },

};

const state = {
  profile: {
    verified: false,
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
  },
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  image_remove_text: {
    title: "Ցանկանում եք հեռացնել նկարը",
    description: "Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա:",
    submit_text: "Հեռացնել",
    cancel_text: "Չեղարկել",
  },
  userEmailResetData: null,
  notifications: [],
  translations: null
};

export default {
  state,
  getters,
  actions,
  mutations,
};
