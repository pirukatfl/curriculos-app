<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />
      <GeneralFeedback />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import Header from "./../components/Header/GenericHeader.vue";
import GeneralFeedback from "src/components/Feedback/GeneralFeedback.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    Header,
    GeneralFeedback,
  },
});
</script>
