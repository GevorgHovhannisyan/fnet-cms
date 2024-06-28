/* eslint-disable */ 
import axios from "axios";

export default {
    getContracts() {
        return axios.get("/contracts");
    },
    getContract(id) {
        return axios.get(`/contracts/${id}`);
    },
    addContract(payload) {
        return axios.post("/contracts", payload);
    },
    setMainContract(id) {
        return axios.patch(`/contracts/${id}`, {main_contract: 1});
    },
    removeContract(id) {
        return axios.delete(`/contracts/${id}`);
    },
};
