<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="layout_main">
    <div class="content">
      <div class="personal_page">
        <div class="left_col">
          <button
            class="icon_close close_menu"
            @click="closeMobileMenu"
          ></button>
          <LeftMenu />
        </div>
        <div class="page_container">
          <div class="right_col">
            <button
              v-if="$route.name !== 'fcoin-shop'"
              class="menu_block"
              @click="openMobileMenu"
            >
              menu
            </button>
            <div
              :class="{ f_page: $route.name === 'fcoin-shop' }"
              v-if="$route.name === 'fcoin-shop'"
            >
              <div class="fcoin_buttons">
                <button class="menu_block" @click="openMobileMenu">menu</button>
                <a class="fcoin_story custom_a"
                  >Ի՞նչ է F Coin-ը <span class="icon_arrowStroke"></span
                ></a>
              </div>
            </div>

            <transition name="component-fade" mode="out-in">
              <router-view />
            </transition>
          </div>
        </div>
      </div>
    </div>
    <Notifications />
  </div>
</template>

<script>
import LeftMenu from "@/components/common/LeftMenu";
import Notifications from "@/components/common/Notification";
export default {
  methods: {
    openMobileMenu() {
      document.body.classList.add("menu_opened");
    },
    closeMobileMenu() {
      document.body.classList.remove("menu_opened");
    },
  },
  components: {
    LeftMenu,
    Notifications,
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/imports/personal/_personalGeneral.scss";

.f_page {
  .fcoin_buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 24px;
    .fcoin_story {
      display: flex;
      align-items: center;
      font-size: 140%;
      line-height: 1.25em;
      background: linear-gradient(223.93deg, #fc0a88 8.61%, #4c17d0 85.74%);
      box-shadow: 0px 8px 44px rgba($siteColor, 0.04),
        0px 2px 14px rgba($siteColor, 0.03);
      border-radius: 16px;
      padding: 12px 24px;
      color: $white;
      @include opacityHover();
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        background: $white;
        color: $siteColor;
        width: 28px;
        height: 28px;
        min-width: 28px;
        border-radius: 50%;
        &:before {
          transform: rotate(-45deg);
          display: block;
        }
      }
    }
  }
}
</style>
