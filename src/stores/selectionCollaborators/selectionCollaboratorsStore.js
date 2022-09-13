import { defineStore } from "pinia";

export const selectionCollaboratorsStore = defineStore({
  id: "selectionCollaboratos",
  state: () => ({
    collaborators: [],
  }),
  getters: {
    getCollaborators: (state) => state.collaborators,
  },
  actions: {
    updateCollaborators(data) {
      this.collaborators = data;
    },
  },
});
