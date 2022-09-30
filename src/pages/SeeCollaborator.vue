<template>
  <div class="see-collaborator">
    <!-- PERFIL -->
    <div v-if="cCandidate.profile" class="profile">
      <div v-if="cCandidate.image" class="photo">
        <img :src="cCandidate.image.image_url" alt="foto do perfil" />
      </div>
      <div v-else>
        <div class="no-img">Não há imagem</div>
      </div>
      <div class="informations">
        <div v-if="cCandidate.id">
          <span class="bold">Identificador:</span> #{{ cCandidate.id }}
        </div>
        <div v-if="cCandidate.profile && cCandidate.profile.name">
          <span class="bold">Nome:</span> {{ cCandidate.profile.name }}
        </div>
        <div v-if="cCandidate.profile && cCandidate.profile.gender">
          <span class="bold">Gênero:</span> {{ cCandidate.profile.gender }}
        </div>
        <div v-if="cCandidate.profile && cCandidate.profile.birth_date">
          <span class="bold">Data de nascimento:</span>
          {{ cCandidate.profile.birth_date }}
        </div>
        <div v-if="cCandidate.profile && cCandidate.profile.year">
          <span class="bold">Idade:</span> {{ cCandidate.profile.year }}
        </div>
        <div v-if="cCandidate.profile && cCandidate.profile.biography">
          <span class="bold">Sobre o candidato:</span>
          {{ cCandidate.profile.biography }}
        </div>
      </div>
    </div>
    <!-- PERFIL -->
    <hr v-if="cCandidate.profile" />
    <!-- CONTATOS -->
    <div class="area" v-if="cCandidate.contacts && cCandidate.contacts.length">
      Contatos
    </div>
    <div
      class="contacts"
      v-if="cCandidate.contacts && cCandidate.contacts.length"
    >
      <template
        v-for="(contact, index) in cCandidate.contacts"
        :key="`${index}contacts`"
      >
        <div class="contacts-item">
          <span class="bold">{{ contact.type }}:</span> {{ contact.value }}
        </div>
      </template>
    </div>
    <!-- CONTATOS -->
    <hr v-if="cCandidate.contacts && cCandidate.contacts.length" />
    <!-- ENDEREÇO -->
    <div class="area" v-if="cCandidate.address">Endereço</div>
    <div class="addresses" v-if="cCandidate.address">
      <!-- {{ cCandidate.address }} -->
      <div v-if="cCandidate.address && cCandidate.address.street">
        <span class="bold">Rua:</span> {{ cCandidate.address.street }}
      </div>
      <div v-if="cCandidate.address && cCandidate.address.number">
        <span class="bold">Número:</span> {{ cCandidate.address.number }}
      </div>
      <div v-if="cCandidate.address && cCandidate.address.district">
        <span class="bold">Bairro:</span> {{ cCandidate.address.district }}
      </div>
      <div v-if="cCandidate.address && cCandidate.address.city">
        <span class="bold">Cidade:</span> {{ cCandidate.address.city }}
      </div>
      <div v-if="cCandidate.address && cCandidate.address.state">
        <span class="bold">Estado:</span> {{ cCandidate.address.state }}
      </div>
      <div v-if="cCandidate.address && cCandidate.address.complement">
        <span class="bold">Complemento:</span>
        {{ cCandidate.address.complement }}
      </div>
      <div v-if="cCandidate.address && cCandidate.address.zipcode">
        <span class="bold">CEP:</span> {{ cCandidate.address.zipcode }}
      </div>
    </div>
    <!-- ENDEREÇO -->
    <hr v-if="cCandidate.address" />
    <!-- EXPERIỀNCIAS -->
    <div
      class="area"
      v-if="cCandidate.experiences && cCandidate.experiences.length"
    >
      Experiências
    </div>
    <div
      class="experiences"
      v-if="cCandidate.experiences && cCandidate.experiences.length"
    >
      <template
        v-for="(experience, index) in cCandidate.experiences"
        :key="`${index}experiences`"
      >
        <div v-if="experience.company_name">
          <span class="bold">Empresa:</span> {{ experience.company_name }}
        </div>
        <div v-if="experience.office">
          <span class="bold">Cargo:</span> {{ experience.office }}
        </div>
        <div v-if="experience.date_in">
          <span class="bold">Data admissão:</span> {{ experience.date_in }}
        </div>
        <div v-if="experience.office.date_out">
          <span class="bold">Data da saída:</span>
          {{ experience.office.date_out }}
        </div>
        <div v-if="experience.office_description">
          <span class="bold">Descrição do cargo:</span>
          {{ experience.office_description }}
        </div>
        <div>
          <span class="bold">Emprego atual?:</span>
          {{ experience.current_job ? "Sim" : "Não" }}
        </div>
      </template>
    </div>
    <!-- EXPERIỀNCIAS -->
    <hr v-if="cCandidate.experiences && cCandidate.experiences.length" />
    <!-- CURSOS -->
    <div class="area" v-if="cCandidate.courses && cCandidate.courses.length">
      Cursos
    </div>
    <div class="courses" v-if="cCandidate.courses && cCandidate.courses.length">
      <template
        v-for="(course, index) in cCandidate.courses"
        :key="`${index}courses`"
      >
        <div v-if="course.course_name">
          <span class="bold">Curso:</span> {{ course.course_name }}
        </div>
        <div v-if="course.institution_name">
          <span class="bold">Nome da instituição:</span>
          {{ course.institution_name }}
        </div>
        <div v-if="course.date_in">
          <span class="bold">Data de início:</span> {{ course.date_in }}
        </div>
        <div v-if="course.date_out">
          <span class="bold">Data de conclusão:</span> {{ course.date_out }}
        </div>
        <div>
          <span class="bold">Finalizado?:</span>
          {{ course.finished ? "Sim" : "Não" }}
        </div>
      </template>
    </div>
    <!-- CURSOS -->
    <hr v-if="cCandidate.courses && cCandidate.courses.length" />
    <!-- ESCOLARIDADE -->
    <div
      class="area"
      v-if="cCandidate.schoolings && cCandidate.schoolings.length"
    >
      Escolaridade
    </div>
    <div class="schoolings">
      <template
        v-for="(schooling, index) in cCandidate.schoolings"
        :key="`${index}schoolings`"
      >
        <div v-if="schooling.institution_name">
          <span class="bold">Instituição:</span>
          {{ schooling.institution_name }}
        </div>
        <div v-if="schooling.course_name">
          <span class="bold">Nome do curso/escola:</span>
          {{ schooling.course_name }}
        </div>
        <div v-if="schooling.level_education">
          <span class="bold">Nível de escolaridade:</span>
          {{ schooling.level_education }}
        </div>
        <div v-if="schooling.date_in">
          <span class="bold">Data de início:</span> {{ schooling.date_in }}
        </div>
        <div v-if="schooling.date_out">
          <span class="bold">Data de conclusão:</span> {{ schooling.date_out }}
        </div>
        <div>
          <span class="bold">Finalizado?:</span>
          {{ schooling.finished ? "Sim" : "Não" }}
        </div>
      </template>
    </div>
    <!-- ESCOLARIDADE -->
    <!-- <div class="favorite">
      <div
        class="select"
        v-if="isFavorite(cCandidate.id)"
        @click="deleteFavorite(cCandidate.id)"
      >
        <svg
          class="fav"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"
          />
        </svg>
      </div>
      <div
        class="select"
        v-if="!isFavorite(cCandidate.id)"
        @click="saveFavorite(cCandidate.id)"
      >
        <svg
          class="fav"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"
          />
        </svg>
      </div>
    </div> -->
  </div>
</template>
<script>
import { api } from "boot/axios";
import jwt from "vue-jwt-decode";

export default {
  name: "SeeCollaborator",
  data() {
    return {
      candidate: null,
      favorites: [],
      infoUser: jwt.decode(JSON.parse(window.localStorage.getItem("infoUser"))),
    };
  },
  beforeUpdate() {
    this.favorites = JSON.parse(localStorage.getItem("favorites"));
    document.addEventListener("storage", this.storageListener);
  },
  mounted() {
    this.getFavorites();
    this.getCandidateInfos();
  },
  methods: {
    isFavorite(id) {
      return this.favorites.some((item) => item.user_in_list_id === id);
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
    async getCandidateInfos() {
      const user_id = this.$route.params.id;
      try {
        const { data } = await api.get(`resumes/${user_id}`);
        this.candidate = data;
      } catch (error) {
        console.log("ERROR", error);
      }
    },
  },
  computed: {
    cCandidate() {
      if (this.candidate) {
        return this.candidate;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.see-collaborator {
  border: 1px solid #2c2c2c;
  border-radius: 4px;
  margin: 5px;
  position: relative;
  padding: 15px;
  font-size: 14px;
  color: #2c2c2c;

  span {
    font-weight: bold;
    background-color: #a3a3a3;
    padding: 3px 4px;
    border-radius: 4px 0 0 4px;
    position: relative;
    margin-left: -2px;
  }

  .profile {
    display: flex;

    .photo {
      img {
        width: 100px;
        height: 130px;
        margin: 0px 15px 15px 0px;
      }
    }

    .no-img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 130px;
      text-align: center;
      border: 1px solid #d4d4d4;
      margin: 0px 15px 15px 0px;
    }

    .informations {
      display: flex;
      flex-wrap: wrap;

      div {
        margin-right: 10px;
      }
    }
  }

  .addresses,
  .contacts,
  .informations,
  .experiences,
  .schoolings,
  .courses {
    display: flex;
    flex-wrap: wrap;

    div {
      margin-right: 10px;
      border: 1px solid #a3a3a3;
      border-radius: 4px;
      padding-right: 3px;
      max-height: 22px;
    }
  }

  .area {
    font-size: 1.4rem;
    font-weight: bold;
    color: #2c2c2c;
  }
}

.favorite {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0;
  right: 0;
  margin: 15px 5px 0 0;
}
.fav {
  cursor: pointer;
  width: 22px;
  fill: rgb(216, 177, 50);
}
</style>
