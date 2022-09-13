<template>
  <div class="input">
    <label class="move">{{ label }}</label>
    <textarea
      :value="value"
      :placeholder="placeholder"
      @input="$emit('onInput', $event.target.value)"
      @click="$emit('clearError', '')"
    />
    <div v-if="info" class="info">{{ info }} <span class="dot">*</span></div>
  </div>
</template>
<script>
export default {
  name: "InputTextArea",
  props: {
    label: String,
    info: String,
    value: String,
    type: String,
    placeholder: String,
  },
  methods: {
    change(value) {
      this.$emit("input", value.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  position: relative;
  margin: 10px 5px;
  width: 100%;
  textarea {
    width: 97%;
    outline: none;
    border: 1px solid transparent;
    background-color: rgba($color: #91919167, $alpha: 0.5);
    padding: 5px;
    border-radius: 4px;
    resize: none;
  }

  .info {
    display: flex;
    align-items: center;
    height: 20px;
    margin: 5px 0;
    font-size: 0.8rem;
  }
  .dot {
    color: red;
    margin-left: 5px;
  }
}
</style>
