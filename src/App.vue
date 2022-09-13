<template>
  <div id="q-app">
    <LoadingModal />
    <ModalInfo />
    <router-view />
    <div
      v-if="$route.fullPath !== '' && !openClose"
      class="feedback"
      @click="() => (openClose = !openClose)"
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
          placeholder="Informe seu email (opicional)"
          :value="email"
          @onInput="email = $event"
        />
        <TextArea
          label="Descreva o problema ou sugestão para o sistema..."
          placeholder="..."
          @onInput="text = $event"
          :value="text"
        />
        <div class="buttons">
          <GenericButton :text="'Salvar'" :type="'submit'" :onClick="save" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import TextArea from "src/components/Inputs/InputTextArea.vue";
import GenericButton from "src/components/Buttons/GenericiButton.vue";
import GenericInput from "src/components/Inputs/GenericInput";
import LoadingModal from "./components/Loader/LoadingModal.vue";
import ModalInfo from "./components/Modals/ModalInfo.vue";

let openClose = ref(false);
let text = ref("");
let email = ref("");
</script>

<style lang="scss" scoped>
.feedback {
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: rgb(10, 129, 197);
  background-color: #fff;
  font-size: 12px;
  width: 30px;
  height: 70px;
  bottom: 0;
  right: 0;
  margin: 0 0 50vh 0;
  border-radius: 4px 0 0 4px;
  // background-color: red;

  .text {
    rotate: -90deg;
  }
}
.box-feedback {
  padding: 15px;
  position: absolute;
  right: -380px;
  width: 380px;
  max-height: 80vh;
  bottom: 0;
  border-radius: 4px 0 0 4px;
  margin: 0 0 35vh 0;
  background-color: #fff;
  transition: right 0.2s ease-in-out;
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
    right: 0;
  }
}
</style>
