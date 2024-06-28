/* eslint-disable */
import * as types from '@/store/mutation-types'

const getters = {
    menu_items: (state) => state.menu_items
}

const actions = {
    setMenuItems({ commit }, payload) {
        commit(types.SET_MENU_ITEMS, payload)
    }
}

const mutations = {
    [types.SET_MENU_ITEMS](state, value) {
        state.menu_items = value
    }
}

const state = {
    menu_items: [
        {
            title: 'MAIN',
            url: "/",
            name: 'main',
            icon: 'home'
        },
        {
            title: 'Payments',
            url: "/payments",
            name: 'payments',
            icon: 'wallet'
        },
        {
            title: 'Services',
            url: "/service",
            name: 'service',
            icon: 'category'
        },
        {
            title: 'My services',
            url: "/contracts",
            name: 'contracts',
            icon: 'contracts'
        },
        {
            title: 'Fcoin shop',
            url: "/fcoin-shop",
            name: 'fcoin-shop',
            icon: 'shop'
        },
        {
            title: 'Payment history',
            url: "/payments-history",
            name: 'payments-history',
            icon: 'history'
        },
        {
            title: 'Auto payment',
            url: "/auto-payment",
            name: 'auto-payment',
            icon: 'union'
        },
    ]
}

export default {
    state,
    getters,
    actions,
    mutations
}
