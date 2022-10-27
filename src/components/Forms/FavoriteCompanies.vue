<template>
  <div class="favorite-companies">
    <div class="form-input">
      <GenericInput
        label="Empresa para favoritar"
        placeholder="Informe o nome da empresa"
        @onInput="company = $event"
        :value="company"
      />
      <div class="buttons">
        <GenericButton
          :text="'Salvar'"
          :type="'submit'"
          :onClick="save"
          :disabled="!company.length"
        />
      </div>
    </div>
    <div class="favorite-list">
      <template v-for="(company, index) in companies" :key="index">
        <GenericTag
          :value="company.company_name"
          :companyId="company.id"
          @delete="deleteCompany($event)"
        />
      </template>
    </div>
  </div>
</template>
<script>
import GenericInput from "src/components/Inputs/GenericInput.vue";
import GenericButton from "src/components/Buttons/GenericiButton.vue";
import GenericTag from "src/components/Tags/GenereicTag.vue";
import { api } from "boot/axios";
import jwt from "vue-jwt-decode";

export default {
  name: "FavoriteCompanies",
  components: { GenericInput, GenericButton, GenericTag },
  data() {
    return {
      company: "",
      companies: ["teste"],
      infoUser: jwt.decode(JSON.parse(window.localStorage.getItem("infoUser"))),
    };
  },
  methods: {
    async getData() {
      try {
        const {
          data: { data: data },
        } = await api.get(`favorites-companies/${this.infoUser.user.id}`);
        console.log(data);
        if (data.length) {
          this.companies = data;
        }
      } catch (error) {}
    },
    async save() {
      try {
        const body = {
          company_name: this.company,
          user_id: this.infoUser.user.id,
        };
        await api.post("favorites-companies", body);
        this.company = "";
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCompany(id) {
      try {
        const body = {
          id,
        };
        await api.post("favorites-companies/delete", body);
        await this.getData();
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
.favorite-companies {
  background-color: #fff;
  height: 83vh;
  overflow: auto;
  padding: 0 15px;

  .form-input {
    display: flex;

    .buttons {
      margin-top: 40px;
      margin-left: 10px;
    }
  }

  .favorite-list {
    display: flex;
    gap: 5px;
  }
}
</style>
