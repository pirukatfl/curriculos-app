<template>
  <header>
    <div class="logo">
      <img src="./../../assets/lupa.png" alt="Lupa vagas" />
    </div>
    <div class="logout" @click="logout">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480v32h32 64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z"
        />
      </svg>
    </div>
  </header>
</template>
<script>
import { api } from "boot/axios";
import jwt from "vue-jwt-decode";

export default {
  name: "GenericHeader",
  methods: {
    async logout() {
      const token = JSON.parse(window.localStorage.getItem("infoUser"));
      console.log(token);
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await api.get("auth/logout", config);
        localStorage.removeItem("infoUser");
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $headerHeight;
  padding: 0 15px;
  border-bottom: 1px solid $primary;

  .logo {
    img {
      width: 140px;
    }
  }

  .logout {
    cursor: pointer;
    svg {
      width: 25px;
      height: 25px;
      fill: $primary;
    }
  }
}
</style>
