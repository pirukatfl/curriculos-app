<template>
  <div class="perfil">
    <div class="box">
      <form>
        <template v-for="(item, index) in form" :key="`div${index}`">
          <div>
            <GenericSelect
              label="Selecione o tipo do contato"
              :value="item.type.value"
              :options="cTypes"
              @onInput="item.type.value = $event"
            />
            <GenericInput
              v-if="item.type.value"
              :label="`Informe o seu ${item.type.value}`"
              :placeholder="`Informe ${item.type.value}`"
              :formatType="item.type.value"
              @onInput="item.value.value = $event"
              @validationError="item.value.error = $event"
              :value="item.value.value"
              :error="item.value.error"
            />
          </div>
          <div class="buttons" v-if="form.length > 1">
            <GenericButton
              :text="'excluir'"
              :type="'button'"
              :onClick="() => deleteContact(index)"
            />
          </div>
          <hr />
        </template>
        <div class="buttons">
          <GenericButton
            :text="'adicionar novo contato'"
            :type="'button'"
            :onClick="newContact"
          />
        </div>
        <div class="buttons">
          <GenericButton :text="'Salvar'" :type="'submit'" :onClick="save" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import GenericButton from "../Buttons/GenericiButton.vue";
import GenericInput from "./../Inputs/GenericInput";
import GenericSelect from "../Inputs/GenericSelect.vue";
import { api } from "boot/axios";
import { contactsTypes } from "./../../helpers/contactsTypes";
import jwt from "vue-jwt-decode";

export default {
  name: "ContatosForm",
  components: {
    GenericInput,
    GenericButton,
    GenericSelect,
  },
  data() {
    return {
      types: contactsTypes,
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
    validForm() {
      return this.form.some((item) => {
        return item.value.error;
      });
    },
    async getData() {
      try {
        const {
          data: { data: data },
        } = await api.get(`contacts/${this.infoUser.user.id}`);
        if (data.length) {
          this.form = [];
          for (let contacts of data) {
            this.form.push({
              type: {
                id: contacts.id,
                user_id: contacts.user_id,
                value: contacts.type,
                error: "",
              },
              value: {
                id: contacts.id,
                user_id: contacts.user_id,
                value: contacts.value,
                error: "",
              },
            });
          }
        } else {
          this.form = [
            {
              type: {
                user_id: this.infoUser.user.id,
                value: "",
                error: "",
              },
              value: {
                user_id: this.infoUser.user.id,
                value: "",
                error: "",
              },
            },
          ];
        }
      } catch (error) {}
    },
    async save() {
      try {
        if (!this.validForm()) {
          const contacts = this.form.map((item) => {
            return {
              user_id: this.infoUser.user.id,
              type: item.type.value,
              value: item.value.value,
            };
          });
          const body = {
            contacts: contacts,
          };
          await api.post("contacts", body);
          await this.getData();
          this.$emit("reload");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteContact(index) {
      if (this.form[index].value.id) {
        try {
          const contacts = {
            id: this.form[index].value.id,
          };
          const body = {
            contacts: contacts,
          };
          await api.post("contacts/delete", body);
          await this.getData();
          this.$emit("reload");
        } catch (error) {
          console.error(error);
        }
      } else {
        this.form.splice(index, 1);
      }
    },
    newContact() {
      this.form.push({
        type: {
          user_id: this.infoUser.user.id,
          value: "",
          error: "",
        },
        value: {
          user_id: this.infoUser.user.id,
          value: "",
          error: "",
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  padding: 15px;
  display: flex;

  max-height: 83vh;
  overflow-y: auto;
  align-items: center;
  background-color: #fff;
  border-radius: 0 0 4px 4px;

  .box-perfil {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: rgba($color: #fff, $alpha: 0.8);
    border-radius: 0 100px 0 0;
  }

  .box-logo {
    margin: 0 auto;
  }
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
