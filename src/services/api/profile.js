import axios from "axios";

export default {
  getUser() {
    return axios.get("/customers");
  },
  getNotifications() {
    return axios.get("/notifications");
  },
  markRead(id) {
    return axios.patch(`/notifications/${id}`);
  },
  markAllRead() {
    return axios.put(`/notifications`);
  },
  getTranslations() {
    return axios.get("/translations");
  },
  changeMyPassword(payload) {
    return axios.post("/change-password", payload);
  },
  changeUserInfo(payload, user_id) {
    return axios.patch(`/customers/${user_id}`, payload);
  },
  changeImage(formData, user_id) {
    return axios({
      method: "post",
      url: `/customer-image/${user_id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteImage(user_id) {
    return axios.delete(`/customer-image/${user_id}`);
  },
  getProfile() {
    return axios.get("/profile");
  },
  saveProfile(payload) {
    return axios.patch("/profile", payload);
  },
  changeMyEmail(payload) {
    return axios.post("/send-email", payload);
  },
  verifyEmail(payload) {
    return axios.post("/verify-email", payload);
  }
};
