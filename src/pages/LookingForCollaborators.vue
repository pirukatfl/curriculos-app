<template>
  <div class="looking-collaborator">
    <div class="container">
      <GenericTable
        :data="collaborators"
        :header="header"
        :body="body"
        :actions="actions"
        :haveCheckbox="true"
        :newStyle="{ margin: '0 10px!important' }"
      />
      <div class="search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
          />
        </svg>
      </div>
      <SearchCollaborators
        :filterOpenClose="filterOpenClose"
        @openClose="filterOpenClose = $event"
      />
    </div>
  </div>
</template>
<script>
import { api } from "boot/axios";
import GenericButton from "src/components/Buttons/GenericiButton.vue";
import GenericInput from "src/components/Inputs/GenericInput";
import GenericSelect from "src/components/Inputs/GenericSelect.vue";
import GenericCheckbox from "src/components/Inputs/GenericCheckbox.vue";
import SearchCollaborators from "src/components/Search/SearchCollaborators.vue";
// import GenericTable from "@/components/Table/Generictable";
import GenericTable from "src/components/Table/GenericTable.vue";
import { educationLevels } from "src/helpers/eduactionLevels";

export default {
  name: "LookingForCollaborator",
  components: {},
  data() {
    return {
      form: {
        level_education: "",
        office: "",
      },
      educationLevels: educationLevels,
      offices: [],
      filterOpenClose: false,
      collaborators: [],
      header: [
        {
          text: "Id",
          value: "id",
          action: "FUNÇÂO X",
          order: "ordenacao X",
        },
        {
          text: "Nome",
          value: "nome",
          action: "FUNÇÂO X",
          order: "ordenacao X",
        },
        {
          text: "Gênero",
          value: "genero",
          action: "FUNÇÂO X",
          order: "ordenacao X",
        },
        {
          text: "Idade",
          value: "idade",
          action: "FUNÇÂO X",
          order: "ordenacao X",
        },
        {
          text: "Endereço",
          value: "endereco",
          action: "FUNÇÂO X",
          order: "ordenacao X",
        },
        {
          text: "escolaridade",
          value: "escolaridade",
          action: "FUNÇÂO X",
          order: "ordenacao X",
        },
        {
          text: "experiencias",
          value: "experiencias",
          action: "FUNÇÂO X",
          order: "ordenacao X",
        },
        {
          text: "cursos",
          value: "cursos",
          action: "FUNÇÂO X",
          order: "ordenacao X",
        },
      ],
      body: [],
      actions: [],
    };
  },
  components: {
    GenericTable,
    GenericButton,
    GenericInput,
    GenericSelect,
    GenericCheckbox,
    SearchCollaborators,
  },
  async created() {
    await this.getData();
    await this.makeData();
  },
  methods: {
    async getData() {
      try {
        const { data: data } = await api.get("resumes");
        this.collaborators = data;
      } catch (error) {}
    },
    async makeData() {
      this.body = this.collaborators.map((item) => {
        return {
          id: item.id,
          nome: item.profile.name || "não informado",
          gender: item.profile.gender || "não informado",
          year: `${item.profile.year} anos` || "não informado",
          address: item.address || "não informado",
          experiences: this.formatExperiences(item.experiences),
          schoolings: this.formatSchoolings(item.schoolings),
          courses: this.formatCourses(item.courses),
        };
      });
    },
    formatExperiences(values) {
      return !values.length
        ? "não informado"
        : values.map((item) => {
            return {
              company_name: item.company_name || "não informado",
              office: item.office || "não informado",
              office_description: item.office_description || "não informado",
              current_job: item.current_job ? "Trabalho atual" : "Não",
            };
          });
    },
    formatSchoolings(values) {
      return !values.length
        ? "não informado"
        : values.map((item) => {
            return {
              institution_name: item.institution_name || "não informado",
              course_name: item.course_name || "não informado",
              level_education: item.level_education || "não informado",
              finished: item.finished ? "Finalizado" : "Não finalizado",
            };
          });
    },
    formatCourses(values) {
      return !values.length
        ? "não informado"
        : values.map((item) => {
            console.log(item);
            return {
              institution_name: item.institution_name || "não informado",
              course_name: item.course_name || "não informado",
              finished: item.finished ? "Finalizado" : "Não finalizado",
            };
          });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;

  .space-between {
    margin-right: 10px;
  }

  .search {
    cursor: pointer;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 30px;
    box-shadow: 10px 5px 5px black !important;
    border-right: 1px solid transparent;
    border-radius: 4px 0 0 4px;
    padding: 5px;
    svg {
      width: 26px;
      fill: rgb(10, 129, 197);
    }
  }
}
</style>

