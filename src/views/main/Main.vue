<template>
  <div class="main_page">
    <div class="services_row">
      <MyServices />
      <FCoin />
    </div>
    <Services />
  </div>
</template>

<script>
import MyServices from "./components/MyServices";
import FCoin from "./components/FCoin";
import Services from "./components/Services";

export default {
  name: "Main",
  components: {
    MyServices,
    FCoin,
    Services,
  },
};
</script>

<style lang="scss">
@import "./main.scss";
</style>
