<template>
  <Transition>
    <div class="loading" v-if="loading.loading">
      <div class="message">
        <div>Carregando</div>
        <div class="quadrado1"></div>
        <div class="quadrado2"></div>
        <div class="quadrado3"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { loadingStore } from "./../../stores/loading/loadingStore";

const loading = loadingStore();
</script>
<style lang="scss" scoped>
.loading {
  position: fixed;
  display: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba($color: #e9e9e9, $alpha: 0.8);
  z-index: 1;

  .message {
    display: flex;
    align-items: baseline;
    color: #2435ca;
    font-size: 1.5rem;
    z-index: 2;
  }
}

.quadrado1 {
  margin-left: 5px;
  background: #2435ca;
  width: 3px;
  height: 3px;
  animation: go-back1 0.5s infinite alternate;
}

@keyframes go-back1 {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-5px);
  }
}

.quadrado2 {
  margin-left: 5px;
  background: #2435ca;
  width: 3px;
  height: 3px;
  animation: go-back2 0.5s infinite alternate;
  animation-delay: 0.1s;
}

@keyframes go-back2 {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-5px);
  }
}

.quadrado3 {
  margin-left: 5px;
  background: #2435ca;
  width: 3px;
  height: 3px;
  animation: go-back3 0.5s infinite alternate;
  animation-delay: 0.2s;
}

@keyframes go-back3 {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-5px);
  }
}
</style>
