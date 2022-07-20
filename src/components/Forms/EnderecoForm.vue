<template>
  <div class="endereco">
    <div class="box-endereco">
      <form>
        <GenericSelect
          label="Selecione seu estado"
          :value="form.state.value"
          :options="cStates"
          @onInput="form.state.value = $event"
        />
        <GenericSelect
          v-if="form.state.value"
          label="Selecione sua cidade"
          :value="form.city.value"
          :options="cCities"
          @onInput="form.city.value = $event"
        />
        <GenericInput
          label="CEP"
          type="text"
          placeholder="Informe o CEP"
          :value="form.zipcode.value"
          @onInput="form.zipcode.value = $event"
          maxlength="4"
        />
        <GenericInput
          v-if="form.zipcode.value && form.zipcode.value.length === 8"
          label="Bairro"
          type="text"
          placeholder="Informe o bairro"
          :value="form.district.value"
          @onInput="form.district.value = $event"
        />
        <GenericInput
          v-if="form.zipcode.value && form.zipcode.value.length === 8"
          label="Rua"
          type="text"
          placeholder="Informe a rua"
          :value="form.street.value"
          @onInput="form.street.value = $event"
        />
        <GenericInput
          v-if="form.zipcode.value && form.zipcode.value.length === 8"
          label="Número"
          type="text"
          placeholder="Informe o número"
          :value="form.number.value"
          @onInput="form.number.value = $event"
        />
        <GenericInput
          v-if="form.zipcode.value && form.zipcode.value.length === 8"
          label="Complemento"
          type="text"
          placeholder="Informe o complement"
          :value="form.complement.value"
          @onInput="form.complement.value = $event"
        />
        <div class="buttons">
          <GenericButton :text="'Salvar'" :onClick="save" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import GenericButton from "../Buttons/GenericiButton.vue";
import GenericInput from "./../Inputs/GenericInput";
import GenericSelect from "./../Inputs/GenericSelect";
import { statesAndCities } from "../../utils/statesAndCities.js";
import { api } from "boot/axios";
import jwt from "vue-jwt-decode";

export default {
  name: "EnderecoForm",
  components: {
    GenericInput,
    GenericButton,
    GenericSelect,
  },
  data() {
    return {
      infoUser: jwt.decode(JSON.parse(window.localStorage.getItem("infoUser"))),
      form: {
        state: {
          value: "",
          error: "",
        },
        city: {
          value: "",
          error: "",
        },
        district: {
          value: "",
          error: "",
        },
        zipcode: {
          value: "",
          error: "",
        },
        street: {
          value: "",
          error: "",
        },
        number: {
          value: "",
          error: "",
        },
        complement: {
          value: "",
          error: "",
        },
      },
    };
  },
  async mounted() {
    await this.getData();
  },
  watch: {
    "form.zipcode.value": {
      handler(value) {
        if (value.length === 8) {
          console.log("consultar");
        }
      },
    },
  },
  methods: {
    async getData() {
      try {
        const data = await api.get(`adresses/${this.infoUser.user.id}`);
        if (data) {
          this.form.city.value = data.data.data.city;
          this.form.state.value = data.data.data.state;
          this.form.district.value = data.data.data.district;
          this.form.number.value = data.data.data.number;
          this.form.zipcode.value = data.data.data.zipcode;
          this.form.complement.value = data.data.data.complement;
          this.form.street.value = data.data.data.street;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async save() {
      try {
        const body = {
          user_id: this.infoUser.user.id,
          state: this.form.state.value,
          city: this.form.city.value,
          district: this.form.district.value,
          zipcode: this.form.zipcode.value,
          street: this.form.street.value,
          number: this.form.number.value,
          complement: this.form.complement.value,
        };
        const { data: data } = await api.post("adresses", body);
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    cStates() {
      return statesAndCities.estados.map((item) => item.nome);
    },
    cCities() {
      return this.form.state.value
        ? statesAndCities.estados.find(
            (item) => item.nome === this.form.state.value
          ).cidades
        : [];
    },
  },
};
</script>
<style lang="scss" scoped>
.endereco {
  padding: 15px;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
  max-height: 91vh;
  overflow-y: auto;
  background-color: rgba($color: #fff, $alpha: 0.8);
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
