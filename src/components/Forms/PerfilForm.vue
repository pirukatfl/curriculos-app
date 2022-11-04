<template>
  <div class="perfil">
    <form enctype="multipart/form-data">
      <GenericInputFile
        label="Escolha Sua Foto"
        placeholder="Escolha sua melhor foto"
        :userId="this.infoUser.user.id"
        :userEmail="this.infoUser.user.email"
        @save="saveWithFile"
        :key="fileKey"
      />
      <GenericInput
        label="Nome completo"
        type="text"
        placeholder="Informe seu nome completo"
        :value="form.name.value"
        @onInput="form.name.value = $event"
      />
      <GenericInput
        label="Idade"
        type="text"
        formatType="number"
        placeholder="Informe sua idade"
        :value="form.year.value"
        @onInput="form.year.value = $event"
      />
      <GenericInput
        label="Data de nascimento"
        type="date"
        placeholder="Informe sua data de nascimento"
        :value="form.birth_date.value"
        @onInput="form.birth_date.value = $event"
      />
      <GenericSelect
        label="Gênero"
        placeholder="Seu gênero"
        :value="form.gender.value"
        :options="genders"
        @onInput="form.gender.value = $event"
      />
      <!-- <GenericInput
        label="Cpf/Cnpj"
        type="text"
        placeholder="Informe seu Cpf/Cnpj"
        :value="form.cpf_cnpj.value"
        @onInput="form.cpf_cnpj.value = $event"
      /> -->
      <TextArea
        label="Conte Um Pouco Sobre Você"
        placeholder="..."
        @onInput="form.biography.value = $event"
        :value="form.biography.value"
      />
      <div class="buttons">
        <GenericButton :text="'Salvar'" :type="'submit'" :onClick="save" />
      </div>
    </form>
  </div>
</template>

<script>
import GenericInputFile from "../Inputs/GenericInputFile.vue";
import TextArea from "../Inputs/InputTextArea.vue";
import GenericButton from "../Buttons/GenericiButton.vue";
import GenericInput from "./../Inputs/GenericInput";
import GenericSelect from "../Inputs/GenericSelect.vue";
import { genders } from "./../../helpers/genders";
import { api } from "boot/axios";
import jwt from "vue-jwt-decode";

export default {
  name: "PerfilForm",
  components: {
    GenericInput,
    GenericButton,
    TextArea,
    GenericSelect,
    GenericInputFile,
  },
  data() {
    return {
      infoUser: jwt.decode(JSON.parse(window.localStorage.getItem("infoUser"))),
      genders: genders,
      file: "",
      fileKey: 0,
      form: {
        name: {
          value: "",
          error: "",
        },
        biography: {
          value: "",
          error: "",
        },
        gender: {
          value: "",
          error: "",
        },
        year: {
          value: "",
          error: "",
        },
        birth_date: {
          value: "",
          error: "",
        },
        // cpf_cnpj: {
        //   value: "",
        //   error: "",
        // },
      },
    };
  },
  async mounted() {
    await this.getData();
  },
  computed: {
    cYear() {
      if (this.form.year.value < 14 || this.form.year.value > 70) {
        return 18;
      }
      return this.form.year.value;
    },
  },
  methods: {
    async getData() {
      try {
        const {
          data: { data: data },
        } = await api.get(`profiles/${this.infoUser.user.id}`);
        if (data) {
          this.form.name.value = data.name || "";
          this.form.biography.value = data.biography || "";
          this.form.gender.value = data.gender || "";
          this.form.year.value = data.year || "";
          this.form.birth_date.value = data.birth_date || "";
          // this.form.cpf_cnpj.value = data.cpf_cnpj || "";
        }
      } catch (error) {}
    },
    async save() {
      try {
        const body = {
          user_id: this.infoUser.user.id,
          name: this.form.name.value,
          biography: this.form.biography.value,
          gender: this.form.gender.value,
          year: this.form.year.value,
          birth_date: this.form.birth_date.value,
          // cpf_cnpj: this.form.cpf_cnpj.value,
        };
        await api.post("profiles", body);
        await this.getData();
        this.$emit("reload");
      } catch (error) {
        console.error(error);
      }
    },
    async saveWithFile() {
      await this.save();
      this.$emit("reload");
      location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
.perfil {
  padding: 15px;
  overflow-y: auto;
  height: 83vh;
  align-items: center;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
