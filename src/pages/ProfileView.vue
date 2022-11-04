<template>
  <div class="profile">
    <div class="container">
      <MenuTab
        :items="items"
        :selected="selecionado"
        @newTab="selecionado = $event"
      />
      <Transition mode="out-in" name="bounce">
        <component
          :is="components[selecionado]"
          :data="data"
          @reload="getData"
        />
      </Transition>
    </div>
  </div>
</template>
<script>
import MenuTab from "../components/Menus/MenuTab.vue";
import Perfil from "../components/Forms/PerfilForm.vue";
import Contatos from "../components/Forms/ContatosForm.vue";
import Endereco from "../components/Forms/EnderecoForm.vue";
import Experiencias from "../components/Forms/ExperienciasForm.vue";
import Cursos from "../components/Forms/CursosForm.vue";
import Escolaridades from "../components/Forms/EscolaridadesForm.vue";
import FavoriteCompanies from "../components/Forms/FavoriteCompanies.vue";

import jwt from "vue-jwt-decode";
import { api } from "boot/axios";

export default {
  name: "ProfileView",
  components: {
    MenuTab,
    Perfil,
    Contatos,
    Endereco,
    Experiencias,
    Cursos,
    Escolaridades,
    FavoriteCompanies,
  },
  data() {
    return {
      items: {
        profile: {
          text: "Perfil",
          info: "",
        },
        contacts: {
          text: "Contatos",
          info: "",
        },
        address: {
          text: "Endereço",
          info: "",
        },
        experiences: {
          text: "Experências",
          info: "",
        },
        courses: {
          text: "Cursos",
          info: "",
        },
        schoolings: {
          text: "Escolaridade",
          info: "",
        },
        favorite_companies: {
          text: "Empresas favoritas",
          info: "",
        },
      },
      components: [
        "Perfil",
        "Contatos",
        "Endereco",
        "Experiencias",
        "Cursos",
        "Escolaridades",
        "FavoriteCompanies",
      ],
      selecionado: 0,
      infoUser: jwt.decode(JSON.parse(window.localStorage.getItem("infoUser"))),
      data: null,
    };
  },
  methods: {
    async getData() {
      const { data: data } = await api.get(`resumes/${this.infoUser.user.id}`);
      this.items.courses.info = this.hasInfoInFormArray(data.courses);
      this.items.profile.info = this.hasInfoInFormObject(data.profile);
      this.items.address.info = this.hasInfoInFormObject(data.address);
      this.items.contacts.info = this.hasInfoInFormArray(data.contacts);
      this.items.experiences.info = this.hasInfoInFormArray(data.experiences);
      this.items.schoolings.info = this.hasInfoInFormArray(data.schoolings);
      this.items.favorite_companies.info = this.hasInfoInFormArray(
        data.favorite_companies
      );
    },
    hasInfoInFormArray(data) {
      let control = 0;
      data.forEach((item) => {
        for (let i in item) {
          if (
            i !== "id" &&
            i !== "image" &&
            i !== "email" &&
            i !== "cpf_cnpj" &&
            i !== "created_at" &&
            i !== "updated_at" &&
            i !== "slug" &&
            i !== "user_id" &&
            i !== "date_out" &&
            i !== "finished"
          ) {
            console.log(i);
            if (item[i]) {
              control++;
            }
          }
        }
      });
      console.log(control);
      return control === 0 ? "Preencha o formulário!" : "";
    },
    hasInfoInFormObject(data) {
      let control = 0;
      for (let i in data) {
        if (
          i !== "id" &&
          i !== "image" &&
          i !== "email" &&
          i !== "cpf_cnpj" &&
          i !== "created_at" &&
          i !== "updated_at" &&
          i !== "slug" &&
          i !== "user_id"
        ) {
          if (data[i]) {
            control++;
          }
        }
      }
      return control === 0 ? "Preencha o formulário!" : "";
    },
  },
  async created() {
    await this.getData();
  },
};
</script>
<style lang="scss" scoped>
.profile {
  padding: 15px;
  height: 100vh;
  background-color: rgba($color: #4a63ec, $alpha: 0.3);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  30% {
    transform: scale(1.01);
  }
  60% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
</style>
