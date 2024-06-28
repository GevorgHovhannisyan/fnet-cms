/* eslint-disable */ 
import axios from "axios";

export default {
    addCard(payload) {
        return axios.post("/add-card", payload);
    },
    getCards() {
        return axios.get("/cards");
    },
    removeCard(id){
        return axios.delete(`/cards/${id}`);
    }
};
