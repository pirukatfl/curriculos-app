import { defineStore } from "pinia";

export const loadingStore = defineStore({
  id: "loading",
  state: () => ({
    loading: false,
  }),
  actions: {
    loadingAction(data) {
      this.loading = data;
    },
  },
});
