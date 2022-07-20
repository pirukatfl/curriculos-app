import { boot } from "quasar/wrappers";
import axios from "axios";
import { loadingStore } from "./../stores/loading/loadingStore";

const path = process.env.DEV ? "http://127.0.0.1:8000/api" : "other";

const loading = loadingStore();

const api = axios.create({ baseURL: path });

export default boot(({ app }) => {
  api.interceptors.request.use(
    function (config) {
      loading.loadingAction(true);
      return config;
    },
    function (error) {
      // setInterval(() => {
      loading.loadingAction(false);
      // }, 1000);
    }
  );
  // ^ ^ ^ this will allow you to use this.$api
  //       so you can easily perform requests against your app's API

  api.interceptors.response.use(
    function (config) {
      // setInterval(() => {
      loading.loadingAction(false);
      // }, 1000);
      return config;
    },
    function (error) {
      // setInterval(() => {
      loading.loadingAction(false);
      // }, 1000);
    }
  );

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
