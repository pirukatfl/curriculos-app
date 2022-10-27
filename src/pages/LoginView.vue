<template>
  <div class="login">
    <div class="box">
      <div class="box-login">
        <form>
          <GenericInput
            label="Login"
            type="text"
            :value="form.login.value"
            :error="form.login.error"
            placeholder="Informe seu login"
            @onInput="form.login.value = $event"
            @clearError="form.login.error = $event"
          />
          <GenericInput
            label="Senha"
            type="password"
            :value="form.password.value"
            :error="form.password.error"
            placeholder="Informe sua senha"
            @onInput="form.password.value = $event"
            @clearError="form.password.error = $event"
          />
          <div class="buttons">
            <GenericButton
              :type="'submit'"
              :text="'Entrar'"
              :onClick="validForm"
            />
            <GenericButton
              :text="'Limpar'"
              :onClick="resetForm"
              :type="'reset'"
            />
          </div>
          <div class="register">
            <div class="make-register" @click="register = true">
              Faça o seu cadastro
            </div>
          </div>
        </form>
      </div>
      <div class="box-logo">
        <img src="./../assets/lupa.png" alt="Lupa vagas">
      </div>
    </div>
    <transition name="fade">
      <ModalRegister v-if="register" @close="register = $event" />
    </transition>
  </div>
</template>

<script setup>
import GenericButton from "../components/Buttons/GenericiButton.vue";
import GenericInput from "./../components/Inputs/GenericInput";
import ModalRegister from "../components/Modals/ModalRegister.vue";

import { api } from "boot/axios";
import { ref, reactive, onMounted } from "vue";
import { auth } from "./../stores/auth/authStore";
import { modalInfoStore } from "./../stores/modalInfo/modalInfoStore";
import jwt from "vue-jwt-decode";

// const authStore = auth();
const modalInfo = modalInfoStore();

const form = reactive({
  login: { value: "", error: "" },
  password: { value: "", error: "" },
});
const register = ref(false);

function validForm() {
  validateEmail();
  validatePassword();
  let control = 0;
  for (let i in form) {
    if (form[i].error.length) {
      control++;
    }
  }
  if (control) {
    return;
  } else {
    login();
  }
}
async function login() {
  try {
    const { data: data } = await api.post("auth/login", {
      email: form.login.value,
      password: form.password.value,
    });
    if (data?.access_token) {
      window.localStorage.setItem(
        "infoUser",
        JSON.stringify(data.access_token)
      );
      const permissionType = jwt.decode(data.access_token);
      console.log(permissionType);

      permissionType.user.permission_id === 3
        ? (window.location.href = "home")
        : (window.location.href = "search-collaborators");
    }
  } catch (error) {
    console.log(error);
    modalInfo.modalInfoAction({
      ...modalInfo.modalInfo,
      show: true,
      message: "Credenciais incorretas!",
      success: false,
    });
  } finally {
  }
}
function resetForm() {
  for (let propriedade in form) {
    form[propriedade].value = "";
    form[propriedade].error = "";
  }
}
function resetErrors(property) {
  form[property].error = "";
}
function validatePassword() {
  if (form.password.value.length < 6) {
    form.password.error = "mínimo 6 caracteres";
    return;
  }
  form.login.error = "";
  return "";
}
function validateEmail() {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!reg.test(form.login.value)) {
    form.login.error = "email inválido";
    return;
  }
  form.login.error = "";
  return "";
}
window.stores = { modalInfo };
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background: url("./../assets/pessoas.jpg");
}

.box {
  padding: 0 25px 0 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  background-color: rgba($color: #9a9a9c, $alpha: 0.6);

  .box-login {
    display: flex;
    // width: 35%;
    min-width: 380px;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: rgba($color: #fff, $alpha: 0.8);
    border-radius: 0 100px 0 0;
  }

  .box-logo {
    width: 100%;
    margin: 0 auto;
    display: flex;

    img {
      margin: 0 auto;
    }
  }
}
.buttons {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
}

.register {
  margin-top: 20px;

  .make-register {
    cursor: pointer;
    font-size: 1rem;
    color: rgba($color: #2435cabb, $alpha: 0.7);
    transition: 0.3s ease-in-out;
    &:hover {
      color: rgba($color: #2435cabb, $alpha: 1);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
