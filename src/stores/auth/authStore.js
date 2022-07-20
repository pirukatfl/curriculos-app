import { defineStore } from "pinia";

export const auth = defineStore({
  id: "auth",
  state: () => ({
    userInfo: {},
  }),
  actions: {
    userInfoAction(data) {
      this.$patch((userInfo = data));
    },
  },
});
