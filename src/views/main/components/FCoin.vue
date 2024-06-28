<template>
  <div class="fcoin_block">
    <div class="fcoin_inner">
      <div v-if="!fcoin_loading">
        <div class="title_row">
          <div class="service_title">FCoin</div>

          <router-link to="/fcoin-shop" custom v-slot="{ navigate, href }">
            <a
              :href="href"
              @click="navigate"
              class="show_all icon_arrowStroke custom_a"
            ></a>
          </router-link>
        </div>
        <div class="coin_quantity">
          {{ fcoin_dashboard.balance }}<span>FCoins</span>
        </div>
        <div class="field_row">
          <div>
            <div class="item_inner">
              <span>{{ fcoin_dashboard.referrals }}</span>
              <span> {{ $t(`Referal`) }} </span>
            </div>
          </div>
          <div>
            <div class="item_inner">
              <span>{{ fcoin_dashboard.exchanged }}</span>
              <span>{{ $t(`Exchanged`) }}</span>
            </div>
          </div>
        </div>
        <div class="product_block" v-if="fcoin_dashboard.product">
          <div class="image_block">
            <img :src="fcoin_dashboard.product.image_path" alt="" title="" />
          </div>
          <div class="product_info">
            <div class="title_row">
              <div class="product_title">
                {{ fcoin_dashboard.product.name }}
              </div>

              <router-link to="/fcoin-shop" custom v-slot="{ navigate, href }">
                <a
                  :href="href"
                  @click="navigate"
                  class="icon_right product_show custom_a"
                ></a>
              </router-link>
            </div>
            <div class="change_coins">
              <div class="nearest_gift">
                {{ fcoin_dashboard.balance }}
                <span>/ {{ fcoin_dashboard.product.price }}</span>
              </div>
              <div class="gift_line">
                <span
                  :style="{
                    width: getProductWidth(fcoin_dashboard.product.price),
                  }"
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="fcoin_bottom">
          <div class="bottom_title">{{ $t(`Invite friend`) }}</div>
          <div class="copy_from">
            <span class="ref_link">{{ fcoin_dashboard.referral_url }}</span>
            <button
              @click="copyCode(fcoin_dashboard.referral_url)"
              class="copy_btn"
              :class="icon"
            ></button>
          </div>
          <!-- @click="copyToClipBoard" -->
        </div>
      </div>
      <div v-else>
        <v-skeleton-loader
          v-bind="attrs"
          type="heading, image, actions, image"
        ></v-skeleton-loader>
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipBoard } from "@/utils/utils";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      ref_link: "www.fnet.am/fcoin:referal1234",
      icon: "icon_contentCopy",
      attrs: {
        class: "mb-6",
        boilerplate: false,
        elevation: 10,
      },
      fcoin_loading: false,
    };
  },
  async created() {
    this.fcoin_loading = true;
    await this.fcoinDashboard().then(() => {
      this.fcoin_loading = false;
    });
  },
  computed: {
    ...mapGetters(["locale", "fcoin_dashboard", "my_fcoins"]),
    getProductWidth() {
      return (price) => {
        console.log("my_fcoins", this.fcoin_dashboard);
        const percent = (this.fcoin_dashboard.balance / price) * 100;
        if (percent >= 100) {
          return `100%`;
        } else {
          return `${percent}%`;
        }
      };
    },
  },
  methods: {
    ...mapActions(["fcoinDashboard"]),
    copyCode() {
      const area = document.querySelector(".ref_link");
      const text = area.innerText;
      copyToClipBoard(text);

      this.icon = "icon_checked";

      setTimeout(() => {
        this.icon = "icon_contentCopy";
      }, 1500);
    },
  },
  watch: {
    async locale() {
      this.fcoin_loading = true;

      await this.fcoinDashboard().then(() => {
        this.fcoin_loading = false;
      });
    },
  },
};
</script>
