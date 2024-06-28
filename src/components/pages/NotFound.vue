<template>
  <div class="error_section">
    <div class="error_block">
      <div class="block_title">{{ $t("notFound.NOT_FOUND") }}</div>
      <div class="block_description">
        {{ $t("notFound.DESCRIPTION") }}
      </div>
      <div class="page_links">
        <router-link class="prev_page icon_left" to="/"> </router-link>
        <router-link
          custom
          class="back_home"
          to="/"
          v-slot="{ navigate, href }"
        >
          <a @click="navigate" :href="href">{{ $t("notFound.BACK_HOME") }}</a>
        </router-link>
      </div>
    </div>
    <div class="image_block">
      <img src="@/assets/sass/images/404.png" alt="" title="" />
    </div>
  </div>
</template>

<script>
import "@/assets/sass/error404.scss";
export default {};
</script>
