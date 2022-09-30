<template>
  <div class="register">
    <div class="box">
      <div class="box-register">
        <div class="header">
          <div class="title">Cadastro</div>
          <div class="close" @click="$emit('close', false)">x</div>
        </div>
        <form>
          <GenericInput
            label="Email"
            type="email"
            :value="form.login.value"
            :error="form.login.error"
            :initValidate="firstRender"
            formatType="email"
            placeholder="Informe seu email"
            @onInput="form.login.value = $event"
            @clearError="form.login.error = $event"
            @validationError="form.login.error = $event"
          />
          <GenericInput
            label="Senha"
            type="password"
            :value="form.password.value"
            :error="form.password.error"
            placeholder="Informe sua senha"
            formatType="password"
            @onInput="form.password.value = $event"
            @clearError="clearErrors"
            @validationError="form.password.error = $event"
          />
          <GenericInput
            label="Repita sua senha"
            type="password"
            :value="form.repassword.value"
            :error="form.repassword.error"
            placeholder="Repita sua senha"
            formatType="password"
            @onInput="form.repassword.value = $event"
            @clearError="clearErrors"
            @validationError="form.repassword.error = $event"
          />
          <div>
            <GenericCheckbox
              :label="'cadastro para empresa?'"
              :value="isCnpj"
              :msgAttention="'Marque aqui se for empresa!'"
              @onInput="isCnpj = $event"
            />
          </div>
          <div class="buttons">
            <GenericButton
              :type="'submit'"
              :text="'Cadastrar'"
              :onClick="validForm"
            />
            <GenericButton
              :text="'Limpar'"
              :onClick="resetForm"
              :type="'reset'"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import GenericButton from "./../../components/Buttons/GenericiButton.vue";
import GenericInput from "./../../components/Inputs/GenericInput";
import GenericCheckbox from "./../../components/Inputs/GenericCheckbox.vue";
import { modalInfoStore } from "./../../stores/modalInfo/modalInfoStore";

// const authStore = auth();

import { api } from "boot/axios";
import { ref, reactive } from "vue";

const modalInfo = modalInfoStore();
const form = reactive({
  login: { value: "", error: "" },
  password: { value: "", error: "" },
  repassword: { value: "", error: "" },
});
let firstRender = ref(false);
let isCnpj = ref(false);

function validForm() {
  let control = 0;
  for (let i in form) {
    if (form[i].error.length) {
      control++;
    }
  }
  if (control) {
    return;
  } else {
    register();
  }
}
function clearErrors() {
  for (let i in form) {
    form[i].error = "";
  }
}
async function register() {
  try {
    clearErrors();
    firstRender = true;
    const validate = validateSamePassword();
    if (validate) {
      const permission = isCnpj.value ? 2 : 3;
      const { data: data } = await api.post("auth/register", {
        email: form.login.value,
        password: form.password.value,
        permission_id: permission,
      });
      if (data) {
        modalInfo.modalInfoAction({
          ...modalInfo.modalInfo,
          show: true,
          success: true,
          message: "Cadastro efetuado com sucesso!",
        });
      }
    }
  } catch (error) {
    modalInfo.modalInfoAction({
      ...modalInfo.modalInfo,
      show: true,
      success: false,
      message: "Email já cadastrado!",
    });
  } finally {
    firstRender = false;
  }
}
function validateSamePassword() {
  if (form.password.value !== form.repassword.value) {
    form.password.error = "As senhas estão diferentes!";
    form.repassword.error = "As senhas estão diferentes!";
    return false;
  }
  return true;
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
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  padding: 10px 25px;
  justify-content: space-between;
  .title {
    font-size: 1rem;
  }

  .close {
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
    color: #fff;
    background-color: $close;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: rgba(216, 69, 69, 1);
    }
  }
}

.register {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  margin: 0 !important;
}

.box {
  padding: 0 25px 0 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  align-items: center;
  background-color: rgba($color: #000000, $alpha: 0.7);

  .box-register {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40%;
    flex-wrap: wrap;
    background-color: rgba($color: #fff, $alpha: 0.9);
    border-radius: 0 0 4px 4px;
    margin: 0 auto;
    padding-bottom: 25px;
  }

  .box-logo {
    margin: 0 auto;
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
