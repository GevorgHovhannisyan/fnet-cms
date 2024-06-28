/* eslint-disable */
import * as types from '@/store/mutation-types'
import api from "@/services/api/contract.js";

const getters = {
    my_contracts: state => {
        return state.my_contracts
    },
    contract_service: state => {
        return state.contract_service
    },
    deleteContractText: state => value => {
        if (value) {
            return {
                title: `Ցանկանում եք հեռացնել ${value} պայմանագիրը`,
                description: "Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա:",
                submit_text: "Հեռացնել",
                cancel_text: "Չեղարկել",
            }
        } else {
            return null;
        }
    },
}

const actions = {
    getContracts({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .getContracts(payload)
                .then((response) => {
                    commit(types.SET_MY_CONTRACTS, response.data)
                    resolve(response);
                    commit("SHOW_LOADING", false);

                })
                .catch((error) => {
                    reject(error);
                    commit("SHOW_LOADING", false);

                });
        });
    },
    getContract({ commit }, payload) {
        return new Promise((resolve, reject) => {
            //   commit(types.SHOW_LOADING, true);
            // commit(types.SHOW_LOADING, true);

            api
                .getContract(payload)
                .then((response) => {
                    console.log('response.data', response.data);
                    commit(types.SET_CONTRACT_SERVICE, response.data.result)
                    resolve(response);
                    // commit(types.SHOW_LOADING, false);

                })
                .catch((error) => {
                    reject(error);
                    // commit(types.SHOW_LOADING, false);
                });
        });
    },
    addContract({ commit }, payload) {
        return new Promise((resolve, reject) => {
            //   commit(types.SHOW_LOADING, true);
            api
                .addContract(payload)
                .then((response) => {
                    if (response.data.success) {
                        const data = response.data.result;
                        commit(types.ADD_CONTRACT, data)
                    }
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    setMainContract({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .setMainContract(payload)
                .then((response) => {
                    if (response.data.success) {

                        commit(types.SET_MAIN_CONTRACT, payload)
                    }
                    commit(types.SHOW_LOADING, false);
                    resolve(response);
                })
                .catch((error) => {
                    commit(types.SHOW_LOADING, false);
                    reject(error);
                });
        });
    },
    removeContract({ commit }, payload) {
        return new Promise((resolve, reject) => {
            //   commit(types.SHOW_LOADING, true);
            api
                .removeContract(payload)
                .then((response) => {
                    commit(types.DELETE_CONTRACT, payload)
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

}
const mutations = {
    [types.SET_MY_CONTRACTS](state, value) {
        state.my_contracts = value
    },
    [types.SET_CONTRACT_SERVICE](state, value) {
        state.contract_service = value
    },

    [types.ADD_CONTRACT](state, contract) {
        state.my_contracts.push(contract);
    },
    [types.SET_MAIN_CONTRACT](state, id) {
        let main_contract = state.my_contracts.find(c => c.main_contract);
        if (main_contract) {
            main_contract.main_contract = 0;
        }
        const index = state.my_contracts.findIndex(c => c.id === id);
        state.my_contracts[index].main_contract = 1;
    },
    [types.DELETE_CONTRACT](state, id) {
        const index = state.my_contracts.findIndex(p => p.id === id);
        state.my_contracts.splice(index, 1);
    },
}

const state = {
    my_contracts: [],
    contract_service: null
};

export default {
    state,
    getters,
    actions,
    mutations
}
