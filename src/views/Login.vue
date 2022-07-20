<template>
  <div class="login">
    <div class="box">
      <div class="box-login">
        <form @submit="validForm()">
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
        </form>
      </div>
      <div class="box-logo">
        <h1>LogoMarca</h1>
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from "./../components/Buttons/GenericiButton.vue";
import GenericInput from "./../components/Inputs/GenericInput";

export default {
  name: "LoginView",
  components: {
    GenericInput,
    GenericButton,
  },
  data() {
    return {
      form: {
        login: { value: "", error: "" },
        password: { value: "", error: "" },
      },
    };
  },
  methods: {
    validForm() {
      this.validateEmail();
      this.validatePassword();
      let control = 0;
      for (let i in this.form) {
        if (this.form[i].error.length) {
          control++;
        }
      }
      if (control) {
        return;
      } else {
        this.login();
      }
    },
    async login() {
      try {
        // const { data: data } = await api.post("auth/login", {
        //   email: form.login.value,
        //   password: form.password.value,
        // });
        // if (data?.access_token) {
        //   // jogar Dados para o vuex
        // }
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
    resetForm() {
      for (let propriedade in this.form) {
        this.form[propriedade].value = "";
        this.form[propriedade].error = "";
      }
    },
    resetErrors(property) {
      this.form[property].error = "";
    },
    validatePassword() {
      if (this.form.password.value.length < 6) {
        this.form.password.error = "mínimo 6 caracteres";
        return;
      }
      this.form.login.error = "";
      return "";
    },
    validateEmail() {
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!reg.test(this.form.login.value)) {
        this.form.login.error = "email inválido";
        return;
      }
      this.form.login.error = "";
      return "";
    },
  },
};
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
  background-color: rgba($color: #4a63ec, $alpha: 0.3);

  .box-login {
    display: flex;
    width: 35%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: rgba($color: #fff, $alpha: 0.8);
    border-radius: 0 100px 0 0;
  }

  .box-logo {
    margin: 0 auto;
  }
}
.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
