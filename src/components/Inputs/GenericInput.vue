<template>
  <div class="input">
    <label class="move" :class="{ error: cError }">{{ label }}</label>
    <input
      :class="{ 'error-input': cError }"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      min="0"
      max="1000"
      @input="$emit('onInput', $event.target.value)"
      @click="$emit('clearError')"
    />
    <div v-if="cError" :class="{ error: cError }" class="info">
      {{ error }}
    </div>
  </div>
</template>
<script>
export default {
  name: "GenericInput",
  props: {
    label: String,
    error: String,
    type: String,
    value: [String, Number],
    placeholder: String,
    formatType: {
      type: String,
      default: "",
    },
    initValidate: Boolean,
  },
  computed: {
    cError() {
      return this.error;
    },
  },
  watch: {
    value() {
      if (this.formatType.toLowerCase() === "email") {
        const regEmail =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (regEmail.test(this.value)) {
          this.$emit("validationError", "");
        } else {
          this.$emit("validationError", "E-mail inválido");
        }
      }
      if (this.formatType.toLowerCase() === "password") {
        if (this.value.length < 6) {
          this.$emit("validationError", "mínimo 6 caracteres");
          return;
        } else {
          this.$emit("validationError", "");
        }
      }
      if (this.formatType.toLowerCase() === "cpf") {
      }
      if (this.formatType.toLowerCase() === "celular/whatsapp") {
        const phone = this.value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(-\d{4})\d+?$/, "$1");
        this.$emit("onInput", phone);
      }
      if (this.formatType.toLowerCase() === "zipcode") {
        const zipcode = this.value
          .replace(/\D/g, "")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(-\d{3})\d+?$/, "$1");
        this.$emit("onInput", zipcode);
      }
      if (this.formatType.toLowerCase() === "number") {
        const num = this.value.replace(/\D/g, "");
        this.$emit("onInput", num);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  font-size: 0.8rem;
  position: relative;
  margin: 10px 0px;
  height: 80px;
  max-width: 360px;
  input {
    width: 100%;
    outline: none;
    border: 1px solid rgba($color: #91919167, $alpha: 0.5);
    background-color: transparent;
    height: 40px;
    padding: 5px;
    border-radius: 4px;

    &.error-input {
      border: 1px solid red;
    }
  }

  .info {
    display: flex;
    align-items: center;
    height: 15px;
    margin: 5px 0;
    font-size: 0.8rem;
  }

  .error {
    color: red;
  }
}

.move {
  display: flex;
}
</style>
