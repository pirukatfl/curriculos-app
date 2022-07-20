<template>
  <div class="input">
    <label class="move" :class="{ error: cError }">{{ label }}</label>
    <select
      :class="{ 'error-input': cError }"
      :value="value"
      @change="$emit('onInput', $event.target.value)"
      @click="$emit('clearError', '')"
    >
      <template v-for="(option, index) in options" :key="index">
        <option :value="option">
          {{ option }}
        </option>
      </template>
    </select>
    <div v-if="cError" :class="{ error: cError }" class="info">
      {{ error }}
    </div>
  </div>
</template>
<script>
export default {
  name: "GenericSelect",
  props: {
    label: String,
    error: String,
    type: String,
    value: [String, Number],
    placeholder: String,
    options: Array,
  },
  watch: {
    value() {
      this.$emit("onInput", this.value);
    },
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
  select {
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
</style>
