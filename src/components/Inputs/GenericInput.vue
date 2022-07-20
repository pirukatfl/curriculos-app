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
      @click="$emit('clearError', '')"
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
  },
  computed: {
    cError() {
      return this.error;
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  font-size: 0.8rem;
  position: relative;
  margin: 10px 5px;
  height: 80px;
  max-width: 360px;
  input {
    width: 100%;
    outline: none;
    border: 1px solid transparent;
    background-color: rgba($color: #91919167, $alpha: 0.5);
    padding: 5px;
    border-radius: 4px;

    &.error-input {
      border: 1px solid red;
    }
  }

  .info {
    display: flex;
    align-items: center;
    height: 10px;
    margin: 5px 0;
    font-size: 0.8rem;
  }

  .error {
    color: red;
  }
}

.move {
  display: flex;
  // margin-bottom: 10px;
}
</style>
