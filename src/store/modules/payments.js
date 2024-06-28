/* eslint-disable */
import * as types from '@/store/mutation-types'
import api from "@/services/api/payment";

const getters = {
    payments: state => {
        return state.payments
    },
    payment_table_headers: (state) => state.payment_table_headers,
    auto_payments: (state) => state.auto_payments,
    payment_popup_text: (state) => state.payment_popup_text,
    ready_payment: (state) => state.ready_payment,
    auto_pay_contracts: (state) => state.auto_pay_contracts,
    auto_pay_contract: (state) => state.auto_pay_contract,
    free_auto_pay_contracts: (state) => state.free_auto_pay_contracts,
}

const actions = {
    payForService({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .payForService(payload)
                .then((response) => {
                    const data = response.data

                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else if (data.redirectUrl) {
                        window.location.href = data.redirectUrl;
                    }
                    resolve(response);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getPaymentHistory({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .getPaymentHistory(payload)
                .then((response) => {
                    const data = response.data

                    if (data.success) {
                        commit(types.SET_PAYMENTS, data.order_list)

                    }
                    resolve(response);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getAutpPays({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .getAutpPays(payload)
                .then((response) => {
                    if (response.data.success) {
                        commit(types.SET_AUTO_PAYMENTS, response.data.result)
                    }
                    resolve(response);
                    commit('SHOW_LOADING', false)
                })
                .catch((error) => {
                    reject(error);
                    commit('SHOW_LOADING', false)
                });
        });
    },
    getAutpPayContracts({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .getAutpPayContracts(payload)
                .then((response) => {
                    if (response.data.success) {
                        commit(types.SET_AUTO_PAY_CONTRACTS, response.data.result)
                    }
                    resolve(response);
                    commit('SHOW_LOADING', false)
                })
                .catch((error) => {
                    reject(error);
                    commit('SHOW_LOADING', false)
                });
        });
    },
    getAutpPayContract({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .getAutpPayContract(payload)
                .then((response) => {
                    if (response.data.success) {
                        commit(types.SET_AUTO_PAY_CONTRACT, response.data)
                    }

                    resolve(response);

                    commit("SHOW_LOADING", false);

                })
                .catch((error) => {
                    reject(error);
                    commit("SHOW_LOADING", false);

                });
        });
    },
    removeAutoPayment({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .removeAutoPayment(payload)
                .then((response) => {
                    commit(types.DELETE_AUTO_PAYMENT, payload)
                    resolve(response);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    createAutoPayment({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .createAutoPayment(payload)
                .then((response) => {

                    resolve(response);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    editAutoPayment({ commit }, { id, payload }) {
        return new Promise((resolve, reject) => {
            api
                .editAutoPayment({ id, payload })
                .then((response) => {

                    resolve(response);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
}
const mutations = {
    [types.SET_PAYMENTS](state, value) {
        state.payments = value
    },
    [types.SET_AUTO_PAYMENTS](state, value) {
        state.auto_payments = value
    },
    [types.SET_AUTO_PAY_CONTRACTS](state, value) {
        state.auto_pay_contracts = value
    },
    [types.SET_AUTO_PAY_CONTRACT](state, value) {
        state.auto_pay_contract = value.result;
        state.free_auto_pay_contracts = value.free_contracts_list;
    },

    [types.DELETE_AUTO_PAYMENT](state, id) {
        const index = state.auto_payments.findIndex(p => p.id === id);
        state.auto_payments.splice(index, 1);
    },
}

const state = {
    ready_payment: localStorage.getItem("payment_services") ? JSON.parse(localStorage.getItem("payment_services")) : null,
    payments: [],
    auto_pay_contracts: [],
    auto_pay_contract: [],
    free_auto_pay_contracts: [],
    payment_table_headers: [
        {
            title: "DATE",
            key: "date"
        },
        {
            title: "Services",
            key: "service"
        },
        {
            title: "CONTRACT",
            key: "contract"
        },
        {
            title: "PAID",
            key: "paid"
        },
        {
            title: "Balance",
            key: "balance"
        },
    ],
    auto_payments: [
        // {
        //     id: 1,
        //     contract_number: "1432 5678 8912",
        //     title: "Երևան Սիլիկյան թաղամաս 14 շենք, 55 բնակարան",
        // },
        // {
        //     id: 2,
        //     contract_number: "1432 5678 8912",
        //     title: "Գեղարքունիքի մարզ, ք. Սևան` 14 շենք, 55 բնակարան 137/1 Նաիրյան փողոց",
        // }
    ],
    payment_popup_text: {
        title: "Ցանկանում եք հեռացնել ավտոմատ վճարումը",
        description: "Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա:",
        submit_text: "Հեռացնել",
        cancel_text: "Չեղարկել",
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}
