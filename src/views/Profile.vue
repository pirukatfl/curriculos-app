<template>
  <div class="profile">
    <div class="container">
      <MenuTab
        :items="items"
        :selected="selecionado"
        @newTab="selecionado = $event"
      />
      <Transition mode="out-in" name="bounce">
        <component :is="components[selecionado]" />
      </Transition>
    </div>
  </div>
</template>
<script>
import MenuTab from "@/components/Menus/MenuTab.vue";
import Perfil from "@/components/Forms/Perfil.vue";
import Contatos from "@/components/Forms/Contatos.vue";
import Endereco from "@/components/Forms/Endereco.vue";

export default {
  name: "ProfileView",
  components: {
    MenuTab,
    Perfil,
    Contatos,
    Endereco,
  },
  data() {
    return {
      items: [
        "Perfil",
        "Contatos",
        "Endereço",
        "Experiências",
        "Cursos",
        "Escolaridade",
      ],
      components: [
        "Perfil",
        "Contatos",
        "Endereco",
        "Experiencias",
        "Cursos",
        "Escolaridade",
      ],
      selecionado: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
.profile {
  padding: 15px;
  min-height: 100vh;
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
