<template>
  <div
    v-if="$route.fullPath !== '' && !openClose"
    class="feedback"
    @click="() => (!message ? (openClose = !openClose) : false)"
  >
    <span class="text">Feedback</span>
  </div>
  <div class="box-feedback" :class="{ active: openClose }">
    <div class="header">
      <div>Nos ajude a melhorar</div>
      <div class="close" @click="() => (openClose = !openClose)">x</div>
    </div>
    <div>
      <GenericInput
        label="Email"
        type="text"
        placeholder="Informe seu email (opcional)"
        :value="email"
        @onInput="email = $event"
      />
      <InputTextArea
        label="Descreva o problema ou sugestão para o sistema..."
        placeholder="..."
        @onInput="text = $event"
        :value="text"
      />
    </div>
    <div class="buttons">
      <GenericButton :text="'Salvar'" :type="'submit'" :onClick="save" />
    </div>
  </div>
</template>

<script>
import GenericButton from "../Buttons/GenericiButton.vue";
import GenericInput from "../Inputs/GenericInput.vue";
import InputTextArea from "../Inputs/InputTextArea.vue";
import { api } from "boot/axios";
import { modalInfoStore } from "./../../stores/modalInfo/modalInfoStore";

export default {
  name: "GeneralFeedback",
  data() {
    return {
      openClose: false,
      email: "",
      text: "",
      modalInfo: modalInfoStore(),
    };
  },
  components: {
    GenericButton,
    GenericInput,
    InputTextArea,
  },
  methods: {
    async save() {
      try {
        const body = {
          email: this.email,
          text: this.text,
        };
        await api.post("feedbacks", body);
        this.email = "";
        this.text = "";
        this.modalInfo.modalInfoAction({
          ...this.modalInfo.modalInfo,
          show: true,
          message: "Seu feedback foi salvo!",
          success: true,
        });
      } catch (error) {
        this.modalInfo.modalInfoAction({
          ...this.modalInfo.modalInfo,
          show: true,
          message: "Ocorreu um erro ao salvar seu feedback!",
          success: true,
        });
        console.error(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.feedback {
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: $primary;
  background-color: #fff;
  font-size: 12px;
  width: 70px;
  height: 30px;
  bottom: 10px;
  left: 10px;
  margin: 0 0 0 0;
  border-radius: 4px;
  border: 1px solid $primary;
  transition: display, background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgb(216, 177, 50);
  }
}
.box-feedback {
  padding: 15px;
  position: absolute;
  left: -380px;
  width: 380px;
  max-height: 80vh;
  bottom: 0;
  border-radius: 0 4px 4px 0;
  margin: 0 0 10px 0px;
  background-color: #fff;
  border-top: 1px solid $primary;
  border-right: 1px solid $primary;
  border-bottom: 1px solid $primary;
  transition: left 0.2s ease-in-out;
  .header {
    display: flex;
    font-size: 14px;
    justify-content: space-between;

    .close {
      cursor: pointer;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
      color: #fff;
      background-color: rgba(216, 69, 69, 0.8);
      transition: 0.2s ease-in-out;

      &:hover {
        background-color: rgba(216, 69, 69, 1);
      }
    }
  }
  &.active {
    left: 0;
  }
}
</style>
