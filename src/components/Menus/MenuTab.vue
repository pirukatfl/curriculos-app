<template>
  <div class="menus">
    <template v-for="(item, index) in items" :key="index">
      <div
        :class="{ active: selected === index }"
        class="tab"
        @click="$emit('newTab', index)"
      >
        {{ item }}
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "MenuTab",
  props: {
    items: {
      type: Array,
      required: true,
    },
    selected: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.menus {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 4px 4px 0 0;
  .tab {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    flex: 1;
    height: 30px;
    font-size: 1rem;
    color: rgb(10, 129, 197);
    background-color: #fff;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: rgba(10, 129, 197, 0.3);
    }

    &.active {
      border-bottom: 1px solid rgb(10, 129, 197);
    }

    &:first-child {
      border-radius: 4px 0 0 0;
    }

    &:last-child {
      border-radius: 0 4px 0 0;
    }
  }
}
</style>
