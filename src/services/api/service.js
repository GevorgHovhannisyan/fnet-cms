import axios from "axios";

export default {
    getServices() {
        return axios.get("/services");
    },
    upgradeService(payload) {
        return axios.post("/services", payload);
    },
    userSignUp(payload) {
        return axios.post("/register", payload);
    },
};
