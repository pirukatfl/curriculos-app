<template>
  <div class="cursos">
    <form>
      <template v-for="(item, index) in form" :key="`div${index}`">
        <div>
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
        </div>
        <div class="buttons" v-if="form.length > 1">
          <GenericButton
            :text="'excluir'"
            :type="'button'"
            :onClick="() => deleteCourse(index)"
          />
        </div>
        <hr />
      </template>
      <div class="buttons">
        <GenericButton
          :text="'adicionar novo curso'"
          :type="'button'"
          :onClick="newCourse"
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
import { api } from "boot/axios";
import jwt from "vue-jwt-decode";
import { removeAccents } from "./../../helpers/removeAccents";

export default {
  name: "CursosForm",
  components: {
    GenericInput,
    GenericButton,
  },
  data() {
    return {
      types: ["Email", "Whatsapp", "Facebook", "Linkedin"],
      infoUser: jwt.decode(JSON.parse(window.localStorage.getItem("infoUser"))),
      form: [],
    };
  },
  computed: {
    cTypes() {
      return this.types;
    },
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      try {
        const {
          data: { data: data },
        } = await api.get(`courses/${this.infoUser.user.id}`);
        if (data.length) {
          this.form = [];
          for (let course of data) {
            this.form.push({
              id: {
                value: course.id,
              },
              user_id: {
                value: this.infoUser.user.id,
              },
              institution_name: {
                value: course.institution_name,
                error: "",
              },
              date_in: {
                value: course.date_in,
                error: "",
              },
              date_out: {
                value: course.date_out,
                error: "",
              },
              current_job: {
                value: course.current_job,
                error: "",
              },
              course_name: {
                value: course.course_name,
                error: "",
              },
              finished: {
                value: course.finished,
                error: "",
              },
            });
          }
        } else {
          this.newCourse();
        }
      } catch (error) {}
    },
    async save() {
      try {
        const courses = this.form.map((item) => {
          return {
            id: item.id.value || null,
            user_id: this.infoUser.user.id,
            institution_name: item.institution_name.value,
            date_in: item.date_in.value,
            date_out: item.date_out.value,
            course_name: item.course_name.value,
            finished: item.finished.value,
            slug: removeAccents(item.course_name.value).toLowerCase(),
          };
        });
        const body = {
          courses: courses,
        };
        await api.post("courses", body);
        await this.getData();
        this.$emit("reload");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteCourse(index) {
      if (this.form[index].id.value) {
        try {
          const courses = {
            id: this.form[index].id.value,
          };
          console.log(index);
          const body = {
            courses: courses,
          };
          await api.post("courses/delete", body);
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
    newCourse() {
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
