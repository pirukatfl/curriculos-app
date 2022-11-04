<template>
  <div class="cursos">
    <form>
      <template v-for="(item, index) in form" :key="`div${index}`">
        <div>
          <GenericSelect
            label="Selecione o nível da escolaridade"
            :value="item.level_education.value"
            :options="educationLevels"
            @onInput="item.level_education.value = $event"
          />
          <GenericInput
            label="Instintuição"
            placeholder="Informe o nome da instituição"
            @onInput="item.institution_name.value = $event"
            :value="item.institution_name.value"
          />
          <GenericInput
            label="Nome do curso"
            placeholder="Informe o nome do curso"
            @onInput="item.course_name.value = $event"
            :value="item.course_name.value"
          />
          <GenericInput
            label="Data de início"
            type="date"
            placeholder="Informe a data do início do curso"
            @onInput="item.data_in.value = $event"
            :value="item.date_in.value"
          />
          <GenericInput
            label="Data de conclusão"
            type="date"
            placeholder="Informe a data da conclusão do curso"
            @onInput="item.date_out.value = $event"
            :value="item.date_out.value"
          />
          <GenericCheckbox
            :label="'Finalizado?'"
            :value="item.finished.value"
            :msgAttention="'Marque aqui se finalizou!'"
            @onInput="item.finished.value = $event"
            @click="unselectOtherExperience(index)"
          />
        </div>
        <div class="buttons" v-if="form.length > 1">
          <GenericButton
            :text="'excluir'"
            :type="'button'"
            :onClick="() => deleteSchooling(index)"
          />
        </div>
        <hr />
      </template>
      <div class="buttons">
        <GenericButton
          :text="'adicionar nova escolaridade'"
          :type="'button'"
          :onClick="newSchooling"
        />
      </div>
      <div class="buttons">
        <GenericButton :text="'Salvar'" :type="'submit'" :onClick="save" />
      </div>
    </form>
  </div>
</template>

<script>
import GenericButton from "../Buttons/GenericiButton.vue";
import GenericInput from "./../Inputs/GenericInput";
import GenericSelect from "../Inputs/GenericSelect.vue";
import GenericCheckbox from "../Inputs/GenericCheckbox.vue";
import { api } from "boot/axios";
import jwt from "vue-jwt-decode";
import { educationLevels } from "src/helpers/eduactionLevels";

export default {
  name: "EscolaridadesForm",
  components: {
    GenericInput,
    GenericButton,
    GenericSelect,
    GenericCheckbox,
  },
  data() {
    return {
      educationLevels: educationLevels,
      infoUser: jwt.decode(JSON.parse(window.localStorage.getItem("infoUser"))),
      form: [],
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      try {
        const {
          data: { data: data },
        } = await api.get(`schoolings/${this.infoUser.user.id}`);
        if (data.length) {
          this.form = [];
          for (let schooling of data) {
            this.form.push({
              id: {
                value: schooling.id,
              },
              user_id: {
                value: this.infoUser.user.id,
              },
              institution_name: {
                value: schooling.institution_name,
                error: "",
              },
              date_in: {
                value: schooling.date_in,
                error: "",
              },
              date_out: {
                value: schooling.date_out,
                error: "",
              },
              course_name: {
                value: schooling.course_name,
                error: "",
              },
              level_education: {
                value: schooling.level_education,
                error: "",
              },
              finished: {
                value: schooling.finished,
                error: "",
              },
            });
          }
        } else {
          this.newSchooling();
        }
      } catch (error) {}
    },
    async save() {
      try {
        const schoolings = this.form.map((item) => {
          return {
            id: item.id.value || null,
            user_id: this.infoUser.user.id,
            institution_name: item.institution_name.value,
            date_in: item.date_in.value,
            date_out: item.date_out.value,
            course_name: item.course_name.value,
            level_education: item.level_education.value,
            finished: item.finished.value,
          };
        });
        const body = {
          schoolings: schoolings,
        };
        await api.post("schoolings", body);
        await this.getData();
        this.$emit("reload");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteSchooling(index) {
      if (this.form[index].id) {
        try {
          const schoolings = {
            id: this.form[index].id.value,
          };
          const body = {
            schoolings: schoolings,
          };
          await api.post("schoolings/delete", body);
          this.form = [];
          await this.getData();
          this.$emit("reload");
        } catch (error) {
          console.error(error);
        }
      } else {
        this.form.splice(index, 1);
      }
    },
    newSchooling() {
      this.form.push({
        id: {
          value: null,
        },
        user_id: {
          value: this.infoUser.user.id,
        },
        institution_name: {
          value: "",
          error: "",
        },
        date_in: {
          value: "",
          error: "",
        },
        date_out: {
          value: "",
          error: "",
        },
        course_name: {
          value: "",
          error: "",
        },
        level_education: {
          value: "",
          error: "",
        },
        finished: {
          value: "",
          error: "",
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.cursos {
  background-color: #fff;
  height: 83vh;
  overflow: auto;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
