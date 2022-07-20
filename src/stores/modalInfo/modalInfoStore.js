import { defineStore } from "pinia";

export const modalInfoStore = defineStore({
  id: "modalInfo",
  state: () => ({
    modalInfo: {
      show: false,
      message: "Cadastrado com sucesso!",
      success: true,
    },
  }),
  actions: {
    modalInfoAction(data) {
      this.modalInfo = data;
      this.resetModalInfo();
    },
    resetModalInfo() {
      setTimeout(() => {
        this.modalInfo = {
          show: false,
          message: "Cadastrado com sucesso!",
          success: true,
        };
      }, 3000);
    },
  },
});
