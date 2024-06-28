/* eslint-disable */
import * as types from "@/store/mutation-types"
import api from "@/services/api/fcoin.js";

const getters = {
    my_fcoins: state => {
        return state.my_fcoins
    },
    fcoin_dashboard: state => {
        return state.fcoin_dashboard
    },
    history: state => {
        return state.history
    },
    history_tabs: state => {
        return state.history_tabs
    },
    gifts: state => {
        return state.gifts
    },
    my_gifts: state => {
        return state.my_gifts
    },
    fcoin_orders: state => {
        return state.fcoin_orders
    },
    gift_tabs: state => {
        return state.gift_tabs
    },
    change_gift_text: state => value =>  {
        if(value) {
            return  {
                title:  `Ցանկանում եք փոխանակել ${value.price} Fcoin-ը ${value.name}-ով`,
                submit_text: "Փոխանակել",
                cancel_text: "Չեղարկել",
            }
        } else {
           return {}
        }
    },
}

const actions = {
    changeGift({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .orderFcoinGift(payload)
                .then((response) => {
                    // commit(types.CHANGE_GIFT, payload)

                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                });
        });

    },
    getFcoinGifts({ commit }) {
        return new Promise((resolve, reject) => {
            api
                .getFcoinGifts()
                .then((response) => {
                    commit(types.SET_FCOIN_GIFTS, response.data)
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getFcoinOrders({ commit }) {
        return new Promise((resolve, reject) => {
            api
                .getFcoinOrders()
                .then((response) => {
                    commit(types.SET_MY_GIFTS, response.data.data)
                    commit(types.SET_FCOIN_ORDERS, response.data.data)
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    fcoinInfo({ commit }) {
        return new Promise((resolve, reject) => {
            api
                .fcoinInfo()
                .then((response) => {
                    commit(types.SET_MY_FCOIN_INFO, response.data)
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    fcoinDashboard({ commit }) {
        return new Promise((resolve, reject) => {
            api
                .fcoinDashboard()
                .then((response) => {
                    commit(types.SET_FCOIN_DASHBOARD, response.data.data)
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    sendFcoinOffer({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .sendFcoinOffer(payload)
                .then((response) => {
                    // commit(types.SET_FCOIN_DASHBOARD, response.data.data)
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },


}
const mutations = {
    [types.SET_FCOIN_GIFTS](state, gifts) {
        state.gifts = gifts
    },
    [types.SET_MY_GIFTS](state, gifts) {
        const completed = gifts.length ? gifts.filter(g => g.status === 3) : [];
        state.my_gifts = completed;
    },
    [types.SET_FCOIN_ORDERS](state, orders) {
        state.fcoin_orders = orders;
    },
    [types.SET_MY_FCOIN_INFO](state, fcoin_info) {
        state.my_fcoins = fcoin_info
    },
    [types.SET_FCOIN_DASHBOARD](state, fcoin_dashboard) {
        state.fcoin_dashboard = fcoin_dashboard
    },
    
    [types.CHANGE_GIFT](state, id) {
        const index = state.gifts.findIndex(c => c.id === id);
        state.gifts[index].active = true
    },

}

const state = {
    my_fcoins: {},
    fcoin_dashboard: {},
    history: [],
    gifts: [],
    my_gifts: [],
    fcoin_orders: [],
    history_tabs: [
        { id: 1, title: "Ռեֆերալից" },
        { id: 2, title: "Վճարումներից" },
        { id: 3, title: "Loyality" },
        { id: 4, title: "Օնլայն հայտից" },
    ],
    gift_tabs: [
        { id: 1, title: "Բոլորը" },
        { id: 2, title: "Իմ նվերները" },
    ],
    // change_gift_text: {
    //     description: "Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա:",
    // }
};

export default {
    state,
    getters,
    actions,
    mutations
}
