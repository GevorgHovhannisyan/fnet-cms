<template>
  <div :class="lngBlock">
    <a
      v-for="(lng, index) in languages"
      :key="index"
      :class="{ selected: lng.code === locale }"
      class="custom_a"
      @click="changeLanguage(lng.code)"
    >
      {{ lng.title }}</a
    >
  </div>
</template>

<script>
export default {
  props: {
    lngBlock: {
      type: String,
    },
  },
  computed: {
    languages() {
      return this.$store.state.locale.languages;
    },
    locale() {
      return this.$store.getters.locale;
    },
  },
  methods: {
    changeLanguage(code) {
      this.$store.commit("SHOW_LOADING", true);
      setTimeout(() => {
        this.$store.commit("SHOW_LOADING", false);
      }, 500);
      this.$store.dispatch("setLocale", code);
      this.$root.$emit("localeChanged");
    },
  },
};
</script>
