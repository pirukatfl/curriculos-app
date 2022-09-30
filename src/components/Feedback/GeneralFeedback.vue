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
</template>
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
  margin: 0 0 45vh 0;
  border-radius: 4px 0 0 4px;
  border-top: 1px solid rgb(10, 129, 197);
  border-left: 1px solid rgb(10, 129, 197);
  border-bottom: 1px solid rgb(10, 129, 197);
  transition: display 0.2s ease-in-out;
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
  margin: 0 0 30vh 0;
  background-color: #fff;
  border-top: 1px solid rgb(10, 129, 197);
  border-left: 1px solid rgb(10, 129, 197);
  border-bottom: 1px solid rgb(10, 129, 197);
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
