<template>
  <button :type="type" @click.prevent="onClick">{{ text }}</button>
</template>
<script>
export default {
  name: "GenericButton",
  props: {
    type: {
      type: String,
      default: "submit",
    },
    onClick: {
      type: Function,
    },
    text: {
      type: String,
      default: "Salvar",
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0 10px;
  height: 28px;
  font-size: 1rem;
  color: #fff;
  border-radius: 4px;
  background-color: rgba($color: rgb(10, 129, 197), $alpha: 0.7);
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: rgba($color: rgb(10, 129, 197), $alpha: 1);
  }
}

.clear {
  background-color: rgba($color: #24ca40bb, $alpha: 0.7);
}
</style>
