import { defineStore } from "pinia";

export const dataUser = defineStore({
  id: "dataUser",
  state: () => ({
    dataUser: null,
  }),
  actions: {
    addDataUser(data) {
      this.dataUser = data;
    },
  },
});
