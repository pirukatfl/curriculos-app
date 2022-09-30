<template>
  <table :style="newStyle">
    <thead>
      <tr>
        <th v-if="haveCheckbox" class="limit">
          <!-- <GenericCheckbox
            :value="all"
            @onInput="all = $event"
            @click="() => {}"
          /> -->
        </th>
        <th class="favorite" v-if="haveFavorite">Favorito</th>
        <th v-for="head in header" :key="head.text">{{ head.text }}</th>
        <th class="alignment" v-if="actions && actions.length">Ações</th>
      </tr>
    </thead>
    <tbody v-if="body.length">
      <tr v-for="item of body" :key="item.id">
        <td v-if="haveCheckbox" class="limit">
          <GenericCheckboxGroup
            :value="item.id"
            :selecteds="selecteds.collaborators"
            @onInput="updateSelecteds($event)"
          />
        </td>
        <td v-if="haveFavorite" class="favorite">
          <svg
            class="fav"
            v-if="isFavorite(item.id)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            @click="deleteFavorite(item.id)"
          >
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"
            />
          </svg>
          <svg
            class="fav"
            v-if="!isFavorite(item.id)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            @click="addFavorite(item.id)"
          >
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"
            />
          </svg>
        </td>
        <td v-for="(element, index) of item" :key="element">
          <div v-if="element">
            <div v-if="typeElement(element)">
              <ul>
                <li v-for="el in element" :key="el">{{ el }}</li>
              </ul>
            </div>
            <div v-else><span v-if="index === 'id'">#</span>{{ element }}</div>
          </div>
          <div v-else>não informado</div>
        </td>
        <td class="alignment" v-if="actions && actions.length">
          <div
            class="action"
            @click="action.func(item.id)"
            v-for="(action, index) in actions"
            :key="`action${index}`"
          >
            {{ action.text }}
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td>Não há dados para apresentar</td>
      </tr>
    </tbody>
    <tfoot v-if="lastPage > 1">
      <tr>
        <div
          v-for="(i, index) in lastPage"
          :key="`tfoot${index}`"
          class="item"
          :class="{ 'not-current': i != this.currentPage }"
          @click="goPage(i)"
        >
          {{ i }}
        </div>
      </tr>
    </tfoot>
  </table>
</template>

<script>
// import GenericCheckbox from "./../Inputs/GenericCheckbox.vue";
import GenericCheckboxGroup from "./../Inputs/GenericCheckboxGroup.vue";
import { selectionCollaboratorsStore } from "./../../stores/selectionCollaborators/selectionCollaboratorsStore";

export default {
  name: "GenericTable",
  data() {
    return {
      all: false,
      selecteds: selectionCollaboratorsStore(),
    };
  },
  props: {
    actions: {
      type: Array,
      required: false,
      default: () => [],
    },
    header: {
      type: Array,
      required: true,
      default: () => [],
    },
    body: {
      type: Array,
      required: true,
      default: () => [],
    },
    haveCheckbox: {
      type: Boolean,
      required: false,
      default: false,
    },
    haveFavorite: {
      type: Boolean,
      required: false,
      default: false,
    },
    newStyle: {
      type: Object,
      default: () => {},
    },
    favorites: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    lastPage: {
      type: Number,
      default: 1,
    },
  },
  components: {
    // GenericCheckbox,
    GenericCheckboxGroup,
  },
  computed: {
    favoritesInStorage() {
      return JSON.parse(localStorage.getItem("favorites"));
    },
  },
  methods: {
    goPage(page) {
      if (page !== this.currentPage) this.$emit("goPage", page);
    },
    typeElement(element) {
      return typeof element === "object";
    },
    addFavorite(id) {
      this.$emit("saveFavorite", id);
    },
    deleteFavorite(id) {
      this.$emit("deleteFavorite", id);
    },
    updateSelecteds(selecteds) {
      this.selecteds.updateCollaborators(selecteds);
    },
    isFavorite(id) {
      return this.favorites.some((item) => item.user_in_list_id === id);
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
  height: calc(100vh - $headerHeight);
  background-color: #fff;

  thead {
    tr {
      border-radius: 4px 4px 0 0;
      display: flex;
      background-color: rgb(240, 240, 240);
      th {
        text-align: left;
        height: 30px;
        padding: 0 8px;
        flex: 1;
        display: flex;
        align-items: center;
        color: $primary;

        &.favorite {
          justify-content: center;
        }
      }
    }
  }

  tbody {
    tr {
      display: flex;
      opacity: 0.8;
      cursor: pointer;
      background-color: rgb(240, 240, 240);
      transition: 0.1s ease-in-out;
      &:nth-child(odd) {
        background-color: rgb(221, 221, 221);
      }
      &:hover {
        background-color: rgb(10, 129, 197);
        opacity: 1;
      }
      td {
        text-align: left;
        min-height: 30px;
        padding: 0 8px;
        flex: 1;
        display: flex;
        align-items: center;

        &.favorite {
          justify-content: center;
        }
      }
    }
  }

  tfoot {
    height: 100px;

    tr {
      border-radius: 4px 4px 0 0;
      display: flex;
      padding: 10px;
      justify-content: center;
      align-items: center;
      height: 100px;

      .item {
        cursor: normal;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        margin: 2px;
        border-radius: 2px;
        background-color: rgba($color: rgb(10, 129, 197), $alpha: 0.7);

        &.not-current {
          cursor: pointer;
          background-color: rgba(
            $color: rgb(172, 185, 192),
            $alpha: 1
          ) !important;
          transition: 0.3s ease-in-out;

          &:hover {
            background-color: rgba(
              $color: rgb(10, 129, 197),
              $alpha: 1
            ) !important;
          }
        }
      }
    }
  }
}

.alignment {
  display: flex;
  justify-content: center;
}

.action {
  height: 22px;
  // letter-spacing: 1px;
  display: flex;
  justify-content: center;
  border-radius: 10%;
  align-items: center;
  background-color: #fff;
  border: 1px solid #cdcdcd;
  padding: 0 3px;
  font-size: 10px;
  transition: 0.2s ease-in-out;
  white-space: nowrap;
  svg {
    padding: 5px;
    width: 50% !important;
  }
  &:hover {
    background-color: rgb(216, 177, 50);
    border: 1px solid transparent;
  }
}
.fav {
  width: 22px;
  fill: rgb(216, 177, 50);
}

.limit {
  max-width: 0px;
  margin-right: -20px;

  @media (max-width: 1096px) {
    margin-right: 0px;
  }
}
</style>
