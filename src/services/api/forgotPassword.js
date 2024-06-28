import axios from "axios";

export default {
  forgotPassword(payload) {
    return axios.post("/forgot-password", payload);
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
};
