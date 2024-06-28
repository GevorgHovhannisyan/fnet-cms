<template>
  <div class="profile_services">
    <div class="title_row">
      <div class="service_title">{{ $t(`Services`) }}</div>
      <router-link
        to="/service"
        class="show_all icon_arrowStroke"
        custom
        v-slot="{ navigate, href }"
      >
        <a @click="navigate" :href="href">{{ $t(`All services`) }}</a>
      </router-link>
    </div>
    <div v-if="!service_loading">
      <ul>
        <li
          v-for="(service, index) in services"
          :key="index"
          @click="routeToService(service.id)"
        >
          <a class="service_item custom_a">
            <img :src="service.icon_path" alt="" title="" />
            <span>{{ service.name }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul>
        <li>
          <v-skeleton-loader v-bind="attrs" type="image"></v-skeleton-loader>
        </li>
        <li>
          <v-skeleton-loader v-bind="attrs" type="image"></v-skeleton-loader>
        </li>

          <li>
          <v-skeleton-loader v-bind="attrs" type="image"></v-skeleton-loader>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data(){
    return {
      service_loading: false,
       attrs: {
        class: "mb-6",
        boilerplate: false,
        elevation: 10,
      },
    }
  },
  computed: {
    ...mapGetters(["services", "locale"]),
  },
  methods: {
    ...mapActions(["getServices"]),
    routeToService(service) {
      this.$router.push({ path: "/service", query: { service: service } });
    },
  },
  async created() {
      this.service_loading = true

    await this.getServices().then(() => {
      this.service_loading = false
    });
  },
  watch: {
    async locale() {
      this.service_loading = true

      await this.getServices().then(() => {
        this.service_loading = false
      });
    },
  },
};
</script>
