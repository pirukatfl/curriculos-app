<template>
  <div v-if="modalInfo.modalInfo.show" class="info">
    <div class="box">
      <div class="box-info">
        <div class="message" :class="{ error: !modalInfo.modalInfo.success }">
          {{ modalInfo.modalInfo.message }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { modalInfoStore } from "./../../stores/modalInfo/modalInfoStore";
const modalInfo = modalInfoStore();
</script>
<style lang="scss" scoped>
.buttons {
  margin: 25px 0;
  display: flex;
  justify-content: space-between;
}

.info {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.6);
  margin: 0 !important;
}

.box {
  padding: 25px;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;

  .box-info {
    padding: 30px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: rgba($color: #fff, $alpha: 0.9);
    border-radius: 4px;

    .message {
      font-size: 1rem;
      color: rgb(75, 168, 38);

      &.error {
        color: red;
      }
    }
  }
}

.header {
  display: flex;
  width: 100%;
  padding: 10px 25px;
  // background-color: red;
  justify-content: space-between;
  .title {
    padding: 3px;
    font-size: 1.2rem;
    color: #414141;
  }
  .close {
    cursor: pointer;
    padding: 3px;
    font-size: 1.2rem;
    color: #414141;
  }
}
</style>
