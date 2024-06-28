/* eslint-disable */
import * as types from "@/store/mutation-types"
import api from "@/services/api/service.js";
import { mapGetters } from "vuex";

const getters = {
    my_services: state => {
        return state.my_services
    },
    services: state => {
        return state.services
    },
    payment_services: state => state.payment_services ? JSON.parse(state.payment_services) : null,
    activate_service_text: state => state.activate_service_text,
}

const actions = {
    // getContracts({ commit }, payload) {
    //     return new Promise((resolve, reject) => {
    //         api
    //           .getContracts(payload)
    //           .then((response) => {
    //               const data = response.data 
    //               commit(types.SET_SERVICES, data);
    //               resolve(response);
    //           })
    //           .catch((error) => {
    //             reject(error);
    //           });
    //       });
    // },
    getServices({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            api
              .getServices(payload)
              .then((response) => {
                  commit(types.SET_SERVICES, response.data);
                  resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
    },
    upgradeService({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
              .upgradeService(payload)
              .then((response) => {
                //   commit(types.SET_SERVICES, response.data);
                  resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
    },

}
const mutations = {
    [types.SET_MY_SERVICES](state, value) {
        state.my_services = value
    },
    [types.SET_SERVICES](state, value) {
        state.services = value
    },
    [types.SET_PAYMENT_SERVICES](state, value) {
        localStorage.setItem("payment_services", JSON.stringify(value));
        state.payment_services = value;
    },
}

const state = {
    services: [],
    payment_services: localStorage.getItem("payment_services") || null,
    my_services: [
        {
            id: 1,
            title: "Ինտերնետ + TV",
            src: "service5.jpg",
            services: [
                {
                    id: 1,
                    coast: "7000 ֏",
                    package: "Basic",
                    internet_speed: "20",
                    tv_channels: "82",
                    resources: [
                        {
                            id: 1,
                            title: "Մինչև 3",
                            description: " թիվիի անվճար միացում"
                        },
                        {
                            id: 2,
                            title: "Անվճար ",
                            description: "միացում"
                        },
                        {
                            id: 3,
                            title: "Անժամկետ ",
                            description: "պայմանագիր"
                        }
                    ]
                },
                {
                    id: 3,
                    coast: "7000 ֏",
                    package: "Basic",
                    internet_speed: "20",
                    tv_channels: "82",
                    selected: true,
                    resources: [
                        {
                            id: 1,
                            title: "Մինչև 3",
                            description: " թիվիի անվճար միացում"
                        },
                        {
                            id: 2,
                            title: "Անվճար ",
                            description: "միացում"
                        },
                        {
                            id: 3,
                            title: "Անժամկետ ",
                            description: "պայմանագիր"
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "TV",
            src: "service6.jpg",
            services: [
                {
                    id: 2,
                    coast: "7000 ֏",
                    package: "Basic",
                    internet_speed: "20",
                    tv_channels: "82",
                    resources: [
                        {
                            id: 1,
                            title: "Մինչև 3",
                            description: " թիվիի անվճար միացում"
                        },
                        {
                            id: 2,
                            title: "Անվճար ",
                            description: "միացում"
                        },
                        {
                            id: 3,
                            title: "Անժամկետ ",
                            description: "պայմանագիր"
                        }
                    ]
                }
            ]
        },
    ],
    activate_service_text: {
        title: "Ցանկանում եք ակտիվացնել Family ծառայությունը",
        description: "Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա:",
        submit_text: "Ակտիվացնել",
        cancel_text: "Չեղարկել",
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
