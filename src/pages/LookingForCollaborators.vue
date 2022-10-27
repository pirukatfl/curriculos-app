<template>
  <div class="looking-collaborator">
    <div class="container">
      <GenericTable
        :header="header"
        :body="body"
        :actions="actions"
        :haveCheckbox="true"
        :haveFavorite="true"
        :newStyle="{ margin: '0 10px!important' }"
        :favorites="favorites"
        :total="total"
        :lastPage="lastPage"
        :currentPage="currentPage"
        @saveFavorite="saveFavorite($event)"
        @deleteFavorite="deleteFavorite($event)"
        @goPage="currentPage = $event"
      />
      <div
        class="search"
        @click="filterOpenClose = true"
        v-if="!filterOpenClose"
      >
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
        @search="executeSearch($event)"
        :courses="courses"
        :districts="districts"
      />
    </div>
  </div>
</template>
<script>
import GenericButton from "src/components/Buttons/GenericiButton.vue";
import GenericInput from "src/components/Inputs/GenericInput";
import GenericSelect from "src/components/Inputs/GenericSelect.vue";
import GenericCheckbox from "src/components/Inputs/GenericCheckbox.vue";
import SearchCollaborators from "src/components/Search/SearchCollaborators.vue";
import GenericTable from "src/components/Table/GenericTable.vue";
// import GenericTable from "@/components/Table/Generictable";
import { educationLevels } from "src/helpers/eduactionLevels";
import { api } from "boot/axios";
import jwt from "vue-jwt-decode";
import { selectionCollaboratorsStore } from "./../stores/selectionCollaborators/selectionCollaboratorsStore";

export default {
  name: "LookingForCollaborator",
  components: {},
  data() {
    return {
      selectedCollaborators: selectionCollaboratorsStore(),
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
          text: "Identificador",
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
          text: "Trabalhando?",
          value: "trabalhando",
          action: "FUNÇÂO X",
          order: "ordenacao X",
        },
        // {
        //   text: "Endereço",
        //   value: "endereco",
        //   action: "FUNÇÂO X",
        //   order: "ordenacao X",
        // },
        // {
        //   text: "escolaridade",
        //   value: "escolaridade",
        //   action: "FUNÇÂO X",
        //   order: "ordenacao X",
        // },
        // {
        //   text: "experiencias",
        //   value: "experiencias",
        //   action: "FUNÇÂO X",
        //   order: "ordenacao X",
        // },
        // {
        //   text: "cursos",
        //   value: "cursos",
        //   action: "FUNÇÂO X",
        //   order: "ordenacao X",
        // },
      ],
      body: [],
      actions: [
        {
          text: "ver mais",
          func: this.detail,
        },
      ],
      infoUser: jwt.decode(JSON.parse(window.localStorage.getItem("infoUser"))),
      favorites: [],
      search: {},
      currentPage: 1,
      lastPage: 0,
      total: 0,
      name: "",
      course_name: "",
      office: "",
      working_time_on_job: "",
      courses: [],
      districts: [],
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
  beforeUpdate() {
    this.favorites = JSON.parse(localStorage.getItem("favorites"));
    document.addEventListener("storage", this.storageListener);
  },
  beforeUnmount() {
    document.removeEventListener("storage", this.storageListener);
  },
  async created() {
    await this.getFavorites();
    await this.getCourses();
    await this.getDistricts();
    await this.getData();
  },
  computed: {
    cSelectedCollaborators() {
      return this.selectedCollaborators.collaborators;
    },
  },
  watch: {
    async currentPage() {
      await this.getData();
    },
  },
  methods: {
    async executeSearch(value) {
      this.name = value.name.value;
      this.course_name = value.course_name.value;
      this.office = value.office.value;
      this.working_time_on_job = value.working_time_on_job.value;
      await this.saveLog();
      await this.getData();
    },
    detail(id) {
      window.open(`/search-collaborators/${id}`, "_blank");
    },
    async saveFavorite(favorite) {
      const body = {
        user_id: this.infoUser.user.id,
        user_in_list_id: favorite,
      };
      try {
        await api.post("favorites", body);
        await this.getFavorites();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFavorite(favorite) {
      const body = {
        user_id: this.infoUser.user.id,
        user_in_list_id: favorite,
      };
      try {
        const body = {
          user_id: this.infoUser.user.id,
          user_in_list_id: favorite,
        };
        await api.post("favorites/delete", body);
        await this.getFavorites();
      } catch (error) {
        console.error(error);
      }
    },
    async getFavorites() {
      try {
        const {
          data: { data: data },
        } = await api.get(`favorites/?user_id=${this.infoUser.user.id}`);
        this.favorites = data;
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      } catch (error) {
        console.error(error);
      }
    },
    async getCourses() {
      try {
        const { data: data } = await api.get("courses");
        this.courses = data.data.map((item) => {
          return item.course_name;
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getDistricts() {
      try {
        const { data: data } = await api.get("adresses");
        this.districts = data.data.map((item) => {
          return item.district;
        });
        console.log(this.districts);
      } catch (error) {
        console.error(error);
      }
    },
    async getData() {
      try {
        const { data: data } = await api.get(
          `resumes?page=${this.currentPage}&name=${this.name}&course_name=${this.course_name}&office=${this.office}&working_time_on_job=${this.working_time_on_job}`
        );
        if (data.data.length) {
          this.collaborators = data.data;
          this.currentPage = data.current_page;
          this.total = data.total;
          this.lastPage = data.last_page;
          await this.makeData();
        } else {
          this.collaborators = [];
          await this.makeData();
        }
      } catch (error) {
        console.error("ERROR", error);
      }
    },
    async saveLog() {
      try {
        const body = {
          user_id: this.infoUser.user.id,
          search: JSON.stringify({
            name: this.name,
            course_name: this.course_name,
            office: this.office,
            working_time_on_job: this.working_time_on_job,
          }),
        };
        await api.post("logs", body);
      } catch (error) {
        console.error(error);
      }
    },
    async makeData() {
      if (this.collaborators.length) {
        this.body = this.collaborators.map((item) => {
          return {
            id: item.id,
            nome: (item.profile && item.profile.name) || "não informado",
            gender: (item.profile && item.profile.gender) || "não informado",
            year:
              item.profile && item.profile.year
                ? `${item.profile.year} anos`
                : "não informado",
            working: this.isWork(item.experiences),
            // address: item.address || "não informado",
            // experiences: this.formatExperiences(item.experiences),
            // schoolings: this.formatSchoolings(item.schoolings),
            // courses: this.formatCourses(item.courses),
          };
        });
      } else {
        this.body = [];
      }
    },
    isWork(item) {
      if (!item.length) {
        return "Não";
      }
      return item.some((el) => el.current_job) ? "Sim" : "Não";
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
  padding-top: 15px;

  .space-between {
    margin-right: 10px;
  }

  .search {
    cursor: pointer;
    display: flex;
    justify-content: center;
    height: 83vh;
    width: 30px;
    border: 1px solid $primary;
    border-right: 1px solid transparent;
    border-radius: 4px 0 0 4px;
    padding: 5px;
    svg {
      width: 26px;
      fill: $primary;
    }
  }
}
</style>
