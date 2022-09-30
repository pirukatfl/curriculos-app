<template>
  <div id="q-app">
    <!-- <Header v-show="cPath" /> -->
    <LoadingModal />
    <ModalInfo />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from "vue";
// import Header from "./components/Header/GenericHeader.vue";
import LoadingModal from "./components/Loader/LoadingModal.vue";
import ModalInfo from "./components/Modals/ModalInfo.vue";

// let cPath = computed(() => {
//   return window.location.pathname !== "/login";
// });
</script>
