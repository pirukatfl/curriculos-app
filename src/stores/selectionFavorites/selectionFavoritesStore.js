import { defineStore } from "pinia";

export const selectionFavoritesStore = defineStore({
  id: "selectionFavorites",
  state: () => ({
    favorites: [],
  }),
  getters: {
    getFavorites: (state) => state.favorites,
  },
  actions: {
    updateFavorites(data) {
      this.favorites = data;
    },
  },
});
