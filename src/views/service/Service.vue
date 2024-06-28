<template>
  <div class="service_page">
    <div class="my_serivces">
      <MyServices :service_loading="service_loading" />
    </div>
    <div class="service_content">
      <ServiceCollapse :service_loading="service_loading" />
    </div>
  </div>
</template>

<script>
import MyServices from "./components/MyServices";
import ServiceCollapse from "./components/ServiceCollapse";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      service_loading: false,
    };
  },
  computed: {
    ...mapGetters(["locale", "user_data"]),
  },
  methods: {
    ...mapActions(["getServices"]),
  },
  created() {
    this.$store.commit("SHOW_LOADING", true);
    this.service_loading = true;
    this.getServices().then(() => {
      this.service_loading = false;
    });

    setTimeout(() => {
      this.$store.commit("SHOW_LOADING", false);
    }, 300);
  },
  watch: {
    async locale() {
      this.service_loading = true;

      await this.getServices().then(() => {
        this.service_loading = false;
      });
    },
  },
  components: {
    MyServices,
    ServiceCollapse,
  },
};
</script>

<style lang="scss">
@import "./service.scss";
</style>
