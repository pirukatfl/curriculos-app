<template>
  <div class="input">
    {{ image_url }}
    <keep-alive>
      <div class="photo-profile" :key="componentKey">
        <img v-if="!image_url" :src="require('./../../assets/no-photo.png')" />
        <img v-else :src="image_url" />
      </div>
    </keep-alive>
    <div class="input-file">
      <label class="file" for="file">Selecione sua melhor foto</label>

      <input
        :class="{ 'error-input': cError }"
        type="file"
        id="file"
        ref="fileInput"
        accept="image/*"
        @change="savePhoto"
      />
    </div>
    <div v-if="cError" :class="{ error: cError }" class="info">
      {{ error }}
    </div>
  </div>
</template>
<script>
import { api } from "boot/axios";

export default {
  name: "GenericInputFile",
  data() {
    return {
      image_url: "",
      componentKey: 0,
    };
  },
  props: {
    label: String,
    error: String,
    first: Boolean,
    type: String,
    userId: Number,
    userEmail: String,
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      try {
        const {
          data: { data: data },
        } = await api.get(`image/${this.userId}`);
        console.log(data);
        if (data) {
          this.image_url = data.image_url;
        }
        this.this.componentKey += 1;
      } catch (error) {
        console.log(error);
      }
    },
    async savePhoto(event) {
      const file = event.target.files[0];
      try {
        let formData = new FormData();

        formData.append("image", file);
        formData.append("user_id", this.userId);
        formData.append("user_email", this.userEmail);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await api.post("image", formData, config);
        await this.getData();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    cError() {
      return this.first && this.error;
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 15px 0;
  max-width: 360px;
  input[type="file"] {
    display: none;

    &.error-input {
      border: 1px solid red;
    }
  }

  .input-file {
    cursor: pointer;
  }

  .info {
    display: flex;
    align-items: center;
    height: 10px;
    margin: 5px 0;
    font-size: 0.8rem;
  }

  .error {
    color: red;
  }

  .photo-profile {
    padding: 40px;
    border-radius: 50%;
    margin-bottom: 10px;
    width: 150px;
    border: 1px solid rgba($color: #91919167, $alpha: 0.5);

    img {
      width: 100%;
    }
  }
}
.file {
  cursor: pointer;
  border-radius: 4px;
  background-color: rgba(10, 129, 197, 0.7);
  padding: 3px 8px;
  color: #fff;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgba(10, 129, 197, 1);
  }
}
</style>
