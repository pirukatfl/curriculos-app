<template>
  <div id="q-app">
    <LoadingModal />
    <ModalInfo />
    <router-view />
  </div>
</template>

<script setup>
import LoadingModal from "./components/Loader/LoadingModal.vue";
import ModalInfo from "./components/Modals/ModalInfo.vue";
</script>
