<template>
  <div class="experiences">
    <form>
      <template v-for="(item, index) in form" :key="index">
        <div>
          <GenericInput
            label="Empresa"
            placeholder="Informe o nome da empresa"
            @onInput="item.company_name.value = $event"
            :value="item.company_name.value"
          />
          <GenericSelect
            label="Cargo"
            :value="item.office.value"
            :options="positions"
            @onInput="item.office.value = $event"
          />
          <GenericInput
            label="Data de admissão"
            type="date"
            placeholder="Informe a data da sua admisão"
            @onInput="item.date_in.value = $event"
            :value="item.date_in.value"
          />
          <GenericInput
            label="Data de saída"
            type="date"
            placeholder="Informe a data da sua saída"
            @onInput="item.date_out.value = $event"
            :value="item.date_out.value"
          />
          <TextArea
            label="Descrição das atividades"
            placeholder="descreva o que você fazia no seu dia a dia"
            @onInput="item.office_description.value = $event"
            :value="item.office_description.value"
          />
          <GenericCheckbox
            :label="'Empresa atual?'"
            :value="item.current_job.value"
            :msgAttention="'Marque aqui se for seu emprego atual!'"
            @onInput="item.current_job.value = $event"
            @click="unselectOtherExperience(index)"
          />
        </div>
        <div class="buttons" v-if="form.length > 1">
          <GenericButton
            :text="'excluir'"
            :type="'button'"
            :onClick="() => deleteExperience(index)"
          />
        </div>
        <hr />
      </template>
      <div class="buttons">
        <GenericButton
          :text="'adicionar nova experiência'"
          :type="'button'"
          :onClick="newExperience"
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
import GenericCheckbox from "./../Inputs/GenericCheckbox";
import GenericSelect from "../Inputs/GenericSelect.vue";
import TextArea from "../Inputs/InputTextArea.vue";
import { api } from "boot/axios";
import jwt from "vue-jwt-decode";
import { positions } from "src/helpers/positions";

export default {
  name: "ExperienciasForm",
  components: {
    GenericInput,
    GenericButton,
    GenericCheckbox,
    GenericSelect,
    TextArea,
  },
  data() {
    return {
      infoUser: jwt.decode(JSON.parse(window.localStorage.getItem("infoUser"))),
      form: [],
      positions: positions,
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    unselectOtherExperience(index) {
      this.form.forEach((item, i) => {
        if (index !== i) {
          item.current_job.value = false;
        }
      });
    },
    async getData() {
      try {
        const {
          data: { data: data },
        } = await api.get(`experiences/${this.infoUser.user.id}`);
        if (data.length) {
          this.form = [];
          for (let experience of data) {
            this.form.push({
              id: {
                value: experience.id,
              },
              user_id: {
                value: this.infoUser.user.id,
              },
              company_name: {
                value: experience.company_name || "",
                error: "",
              },
              date_in: {
                value: experience.date_in || "",
                error: "",
              },
              date_out: {
                value: experience.date_out || "",
                error: "",
              },
              current_job: {
                value: experience.current_job,
                error: "",
              },
              office: {
                value: experience.office || "",
                error: "",
              },
              office_description: {
                value: experience.office_description || "",
                error: "",
              },
            });
          }
        } else {
          this.newExperience();
        }
      } catch (error) {}
    },
    async save() {
      try {
        const experiences = this.form.map((item) => {
          return {
            id: item.id.value || null,
            user_id: this.infoUser.user.id,
            company_name: item.company_name.value,
            date_in: item.date_in.value,
            date_out: item.date_out.value,
            current_job: false || item.current_job.value,
            office: item.office.value,
            office_description: item.office_description.value,
          };
        });
        const body = {
          experiences: experiences,
        };
        await api.post("experiences", body);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteExperience(index) {
      if (this.form[index].id) {
        try {
          const experiences = {
            id: this.form[index].id.value,
          };
          const body = {
            experiences: experiences,
          };
          await api.post("experiences/delete", body);
          await this.getData();
        } catch (error) {
          console.error(error);
        }
      } else {
        this.form.splice(index, 1);
      }
    },
    newExperience() {
      this.form.push({
        id: {
          value: null,
        },
        user_id: {
          value: this.infoUser.user.id,
        },
        company_name: {
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
        current_job: {
          value: "",
          error: "",
        },
        office: {
          value: "",
          error: "",
        },
        office_description: {
          value: "",
          error: "",
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.experiences {
  background-color: #fff;
  height: 91vh;
  overflow: auto;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
