import Vue from "vue";
import axios from "axios";
import router from "../router/index";
// import { checkIfTokenNeedsRefresh } from "@/utils/utils.js"
axios.defaults.baseURL = process.env.VUE_APP_API_URL || "http://localhost:3000";
axios.defaults.headers.common["Accept-Language"] =
  JSON.parse(localStorage.getItem("locale")) || "am";
axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // If request is different than any of the URLS in whiteList
    // then send Authorization header with token from localstorage
    const whiteList = [
      "/login",
      "/forgot",
      "/register",
      "/reset",
      `${window.location.origin}/version.json`,
    ];
    if (whiteList.indexOf(config.url) === -1) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    // Checks if app is being used in mobile
    // if (
    //   response.config.url !== `${process.env.VUE_APP_API_URL}/token` &&
    //   response.config.url !== `${window.location.origin}/version.json`
    // ) {
    //   checkIfTokenNeedsRefresh()
    // }
    return response;
  },
  (error) => {
    if (error && error.response.status === 401) {
      router.push("/login").catch(() => {});
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

// eslint-disable-next-line no-shadow
Plugin.install = (Vue) => {
  Vue.axios = axios;
  window.axios = axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios;
      },
    },
    $axios: {
      get() {
        return axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
