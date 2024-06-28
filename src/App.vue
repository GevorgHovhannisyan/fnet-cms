<template>
  <div id="app">
    <div>
      <router-view />
      <Loader v-if="loading" />
    </div>
  </div>
</template>

<script>
import Loader from "./components/common/Loader.vue";
export default {
  created() {
    document.title = "Personal cabinet";
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  components: {
    Loader,
  },
};
</script>
