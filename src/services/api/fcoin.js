/* eslint-disable */
import axios from "axios";

export default {
    fcoinInfo() {
        return axios.get("/fcoin");
    },
    fcoinDashboard() {
        return axios.get("/fcoin-dashboard");
    },
    getFcoinGifts() {
        return axios.get("/fcoin-products");
    },
    getFcoinOrders() {
        return axios.get("/fcoin-orders");
    },
    orderFcoinGift(payload) {
        return axios.post("/fcoin-order", payload);
    },
    sendFcoinOffer(payload) {
        return axios.post("/fcoin-offer", payload);
    },
};
