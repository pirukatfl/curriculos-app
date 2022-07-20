<template>
  <table :style="newStyle">
    <thead>
      <tr>
        <th v-if="haveCheckbox">
          <GenericCheckbox
            :value="all"
            @onInput="all = $event"
            @click="() => {}"
          />
        </th>
        <th v-for="head in header" :key="head.text">{{ head.text }}</th>
        <th class="alignment" v-if="actions && actions.length">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of body" :key="item.id">
        <td v-if="haveCheckbox">
          <GenericCheckbox
            :value="item.checked"
            @onInput="item.checked = $event"
            @click="() => {}"
          />
        </td>
        <td v-for="element of item" :key="element">
          <div v-if="element">
            <div v-if="typeElement(element)">
              <ul v-for="el in element" :key="el">
                <li v-for="(e, chave, index) of el" :key="e">
                  {{ e }}-{{ chave }}-{{ index }}
                </li>
              </ul>
            </div>
            <div v-else>{{ element }}</div>
          </div>
          <div v-else>não informado</div>
        </td>
        <td class="alignment" v-if="actions && actions.length">
          <div></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import GenericCheckbox from "./../Inputs/GenericCheckbox.vue";
export default {
  name: "GenericTable",
  data() {
    return {
      all: false,
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
    },
    newStyle: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    GenericCheckbox,
  },
  methods: {
    typeElement(element) {
      return typeof element === "object";
    },
    applyPropChecked() {
      if (!this.haveCheckbox) return;
      this.body.forEach((item) => {
        item.checked = false;
      });
    },
  },
  mounted() {
    this.applyPropChecked();
  },
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
  height: 80vh;
  background-color: #fff;
  // border-radius: 4px!important;
  // border: 1px solid rgb(10, 129, 197);
  overflow: scroll;

  thead {
    tr {
      border-radius: 4px 4px 0 0;
      display: flex;
      background-color: #fff;
      th {
        text-align: left;
        height: 30px;
        padding: 0 8px;
        flex: 1;
        display: flex;
        align-items: center;
        color: rgb(10, 129, 197);
      }
    }
  }

  tbody {
    tr {
      // border-radius: 4px 4px 0 0;
      display: flex;
      opacity: 0.8;
      cursor: pointer;
      background-color: rgb(240, 240, 240);
      transition: 0.1s ease-in-out;
      &:nth-child(odd) {
        background-color: rgb(221, 221, 221);
      }
      &:hover {
        background-color: rgb(216, 177, 50);
        opacity: 1;
      }
      td {
        text-align: left;
        min-height: 30px;
        padding: 0 8px;
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }
}

.alignment {
  display: flex;
  justify-content: center;
}
</style>
