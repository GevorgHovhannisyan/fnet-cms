import axios from "axios";

export default {
  userSignUp(payload) {
    return axios.post("/register", payload);
  },
  checkContractNumber(params) {
    return axios.get("/check-contract-number", { params });
  },
  checkPhoneNumber(params) {
    return axios.get("/check-phone", { params });
  },
  sendPhone(payload) {
    return axios.post("/send-phone", payload);
  },
  verifyPhone(payload) {
    return axios.post("/verify-phone", payload);
  },
  userSetPassword(payload) {
    return axios.post("/set-password", payload);
  },
};
