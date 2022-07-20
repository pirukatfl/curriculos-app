<template>
  <div
    v-if="filterOpenClose"
    class="collaborators-filter"
    :class="{ open: !filterOpenclose }"
  >
    <div class="header-search">
      <div class="close" @click="$emit('openClose', false)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
          />
        </svg>
      </div>
      <div class="text">Filtre seus candidatos</div>
    </div>
    <form>
      <!-- <GenericSelect
        label="Selecione o nível da escolaridade"
        :value="form.level_education"
        :options="educationLevels"
        @onInput="form.level_education = $event"
      /> -->
      <div class="buttons">
        <GenericButton :text="'Filtrar'" :type="'submit'" :onClick="() => {}" />
      </div>
    </form>
  </div>
</template>
<script>
import GenericButton from "src/components/Buttons/GenericiButton.vue";
// import GenericSelect from "src/components/Inputs/GenericSelect.vue";
// import GenericTable from "@/components/Table/Generictable";
import { educationLevels } from "src/helpers/eduactionLevels";

export default {
  name: "SearchCollaborators",
  data() {
    return {
      educationLevels: educationLevels,
      filter: {
        name: "",
        course_name: "",
        office: "",
        working_time_on_job: "",
      },
    };
  },
  props: {
    filterOpenClose: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    GenericButton,
    // GenericSelect,
  },
};
</script>
<style lang="scss" scoped>
.header-search {
  display: flex;
  height: 30px;
  padding: 0 15px;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid rgba($color: #4a63ec, $alpha: 0.3);

  .close {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: rgb(10, 129, 197);

    svg {
      width: 18px;
      fill: rgb(10, 129, 197);
    }
  }

  .text {
    font-size: 14px;
    color: rgb(10, 129, 197);
  }
}
.collaborators-filter {
  width: 0px;
  height: 100%;
  background-color: #fff;
  margin-right: -15px;
  transition: transform width 0.2s ease-in-out;
  &.open {
    margin-left: 5px;
    border-radius: 4px 0 0 4px;
    width: 380px;
  }
}
.container {
  display: flex;
  height: 100%;

  .filter {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 4px 0 0 4px;
    margin-left: 5px;
    margin-right: -15px;
    min-height: 30px;
    width: 28px;

    &:before {
      position: absolute;
    }
  }
}
.looking-collaborator {
  padding: 15px;
  height: 100vh;
  background-color: rgba($color: #4a63ec, $alpha: 0.3);
}
</style>
