/* eslint-disable */
import * as types from '@/store/mutation-types'
import router from '@/router'
import api from '@/services/api/auth'
import { addMinutes, format } from 'date-fns'

const MINUTES_TO_CHECK_FOR_TOKEN_REFRESH = 1440

const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  isTokenSet: (state) => state.isTokenSet
}

const actions = {
  userLogin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .userLogin(payload)
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.setItem(
              'user',
              JSON.stringify(response.data)
            )
            window.localStorage.setItem(
              'token',
              response.data.api_token
            )


            // window.localStorage.setItem(
            //   'tokenExpiration',
            //   JSON.stringify(
            //     format(
            //       addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH),
            //       't'
            //     )
            //   )
            // )
            commit(types.SAVE_USER, response.data)
            commit(types.SAVE_TOKEN, response.data.api_token)
            // commit(types.EMAIL_VERIFIED, response.data.user.verified)
            console.log(5555);
            commit(types.SHOW_LOADING, false)

            resolve(response)
          }
        })
        .catch((error) => {
          reject(error)
          commit(types.SHOW_LOADING, false)

        })
    })
  },
  userRegistration({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true)

      resolve({ status: 200 })

      return false
      api
        .userRegistration(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  userSetPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true)

      resolve({ status: 200 })

      return false
      api
        .userSetPassword(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .refreshToken()
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.token)
            )
            window.localStorage.setItem(
              'tokenExpiration',
              JSON.stringify(
                format(
                  addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH),
                  't'
                )
              )
            )
            commit(types.SAVE_TOKEN, response.data.token)
            resolve(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  autoLogin({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'))
    commit(types.SAVE_USER, user)
    commit(types.SAVE_TOKEN, JSON.parse(localStorage.getItem('token')))
    commit(types.SET_LOCALE, JSON.parse(localStorage.getItem('locale')))
    commit(types.EMAIL_VERIFIED, user.verified)
  },
  userLogout({ commit }) {
    window.localStorage.removeItem('token')
    // window.localStorage.removeItem('tokenExpiration')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('forgot_data')
    window.localStorage.removeItem('payment_services')
    window.localStorage.removeItem('reg-step')
    commit(types.LOGOUT)
    router.push({
      name: 'login'
    })
  },
}

const mutations = {
  [types.SAVE_TOKEN](state, token) {
    state.token = token
    state.isTokenSet = true
  },
  [types.LOGOUT](state) {
    state.user = null
    state.token = null
    state.isTokenSet = false
  },
  [types.SAVE_USER](state, user) {
    state.user = user
  }
}

const state = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem('token') || null,
  isTokenSet: !!localStorage.getItem('token'),
}

export default {
  state,
  getters,
  actions,
  mutations
}
