<template>
  <div class="warnings">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      @mouseover="openClose = true"
      @mouseleave="openClose = false"
    >
      <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"
      />
    </svg>
    <div v-show="openClose" class="info">
      {{ info }}
    </div>
  </div>
</template>
<script>
export default {
  name: "GenericWarnings",
  data() {
    return {
      openClose: false,
    };
  },
  props: {
    info: {
      type: String,
      default: "",
      required: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.warnings {
  position: relative;
  svg {
    display: flex;
    margin-left: 10px;
    width: 16px;
    fill: $negative;
  }
  .info {
    background-color: $white;
    z-index: 1;
    border: 1px solid $primary;
    font-size: 11px;
    padding: 2px 4px;
    word-break: break-all;
    border-radius: 4px;
    position: absolute;
    top: 20px;
    left: -40px;
  }
}
</style>
