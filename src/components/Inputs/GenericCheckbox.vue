<template>
  <div>
    <div class="input">
      <label class="move">{{ label }}</label>
      <input
        type="checkbox"
        @change="$emit('onInput', check)"
        v-model="check"
      />
    </div>
    <div v-if="msgAttention" class="msg-attention">
      {{ msgAttention }}
    </div>
  </div>
</template>
<script>
export default {
  name: "GenericCheckbox",
  date() {
    return {
      check: false,
    };
  },
  props: {
    msgAttention: String,
    label: String,
    value: [String, Number, Boolean],
  },
  created() {
    this.check = this.value;
  },
  watch: {
    value() {
      this.check = this.value;
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  position: relative;
  max-width: 360px;
  input {
    cursor: pointer;
    margin-left: 5px;
    outline: none;
    border: 1px solid rgba($color: #91919167, $alpha: 0.5);
    background-color: transparent;
    border-radius: 4px;

    &.error-input {
      border: 1px solid red;
    }
  }

  .info {
    display: flex;
    align-items: center;
    height: 48px;
    height: 10px;
    margin: 10px 5px;
    font-size: 0.8rem;
  }

  .error {
    color: red;
  }
}

.msg-attention {
  color: rgb(216, 177, 50);
  font-size: 0.7rem;
}
</style>
