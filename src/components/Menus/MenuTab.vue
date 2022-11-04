<template>
  <div class="menus">
    <template v-for="(item, key, index) in items" :key="index">
      <div
        :class="{ active: selected === index }"
        class="tab"
        @click="$emit('newTab', index)"
      >
        <span>{{ item.text }}</span>
        <span v-if="item.info">
          <GenericWarnings :info="item.info" />
        </span>
      </div>
    </template>
  </div>
</template>
<script>
import GenericWarnings from "./../Infos/GenericWarnings.vue";

export default {
  name: "MenuTab",
  props: {
    items: {
      type: Object,
      required: true,
    },
    selected: {
      type: Number,
      required: true,
    },
    isEmpty: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    GenericWarnings,
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
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    flex: 1;
    height: 30px;
    font-size: 1rem;
    color: $primary;
    background-color: #fff;
    transition: 0.2s ease-in-out;
    white-space: nowrap;

    &:hover {
      background-color: rgba(10, 129, 197, 0.3);
    }

    &.active {
      border-bottom: 2px solid $primary;
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
