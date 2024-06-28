/* eslint-disable */ 
import axios from "axios";

export default {
    removeAutoPayment(id) {
        return axios.delete(`/auto-payment/${id}`);
    },
    getAutpPays() {
        return axios.get("/auto-payment");
    },
    payForService(payload) {
        return axios.post("/payment", payload);
    },
    getPaymentHistory(params) {
        return axios.get("/order-list", {params});
    },
    createAutoPayment(payload) {
        return axios.post("/auto-payment", payload);
    },
    getAutpPayContracts() {
        return axios.get("/auto-payment-contracts");
    },
    getAutpPayContract(id) {
        return axios.get(`/auto-payment/${id}`);
    },
    editAutoPayment({id, payload}) {
        return axios.patch(`/auto-payment/${id}`, payload);
    },
};
