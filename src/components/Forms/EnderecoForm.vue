<template>
  <div class="endereco">
    <div class="box-endereco">
      <form>
        <GenericInput
          label="CEP"
          type="text"
          placeholder="Informe o CEP"
          formatType="zipcode"
          :value="form.zipcode.value"
          :error="form.zipcode.error"
          @clearError="form.zipcode.error = $event"
          @onInput="form.zipcode.value = $event"
        />

        <div v-if="errorZipcodeSearch">
          <GenericSelect
            label="Estado"
            :value="form.state.value"
            :options="cStates"
            @onInput="form.state.value = $event"
          />
        </div>
        <div v-else>
          <GenericInput
            label="Selecione seu estado"
            :value="form.state.value"
            @onInput="form.state.value = $event"
          />
        </div>

        <div v-if="errorZipcodeSearch || !form.state.value">
          <GenericSelect
            v-if="form.state.value"
            label="Cidade"
            :value="form.city.value"
            :options="cCities"
            @onInput="form.city.value = $event"
          />
        </div>
        <div v-else>
          <GenericInput
            label="Selecione sua cidade"
            :value="form.city.value"
            @onInput="form.city.value = $event"
          />
        </div>

        <GenericInput
          label="Bairro"
          type="text"
          placeholder="Informe o bairro"
          :value="form.district.value"
          @onInput="form.district.value = $event"
        />
        <GenericInput
          label="Rua"
          type="text"
          placeholder="Informe a rua"
          :value="form.street.value"
          @onInput="form.street.value = $event"
        />
        <GenericInput
          label="Número"
          type="text"
          placeholder="Informe o número"
          :value="form.number.value"
          @onInput="form.number.value = $event"
        />
        <GenericInput
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
import { removeAccents } from "./../../helpers/removeAccents";

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
      errorZipcodeSearch: false,
      form: {
        id: {
          value: "",
          error: "",
        },
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
        this.errorZipcodeSearch = false;
        if (value && value.length === 9) {
          this.getAddresses();
        }
      },
    },
  },
  methods: {
    async getAddresses() {
      try {
        this.loading = true;
        const zipcode = this.form.zipcode.value.split("-").join("");
        fetch(`http://viacep.com.br/ws/${zipcode}/json/`)
          .then((response) => response.json())
          .then((data) => {
            if (data.erro) {
              this.errorZipcodeSearch = true;
              this.form.zipcode.error = "CEP inválido";
              this.form.state.value = "";
              this.form.city.value = "";
              this.form.street.value = "";
              this.form.district.value = "";
              this.form.number.value = "";
              this.form.complement.value = "";
            } else {
              this.errorZipcodeSearch = false;
              this.form.state.value = data.uf;
              this.form.city.value = data.localidade;
              this.form.street.value = data.logradouro;
              this.form.district.value = data.bairro;
            }
          });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getData() {
      try {
        const data = await api.get(`adresses/${this.infoUser.user.id}`);
        if (data) {
          this.form.id.value = data.data.id;
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
          slug: removeAccents(this.form.district.value).toLowerCase(),
        };
        await api.post("adresses", body);
        await this.getData();
        this.$emit("reload");
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
      return !this.form.zipcode.value.lenght
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
  height: 83vh;
  overflow-y: auto;
  background-color: rgba($color: #fff, $alpha: 0.8);
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
