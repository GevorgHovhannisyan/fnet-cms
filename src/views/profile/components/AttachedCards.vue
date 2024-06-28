<template>
  <li>
    <div class="item_inner">
      <div class="attached_inner" v-if="cards.length">
        <div class="title_row">
          <div class="service_title">{{ $t(`Attached cards`) }}</div>
          <a class="add_card custom_a" @click="addCardAction"
            >{{ $t(`Attach`) }}
            <span class="icon_plus"></span>
          </a>
        </div>
        <div
          class="attach_section"
          :class="{ hovered: hoveredClass }"
          v-if="cards.length"
          @mouseover="hoveredClass = true"
          @mouseleave="hoveredClass = false"
        >
          <div class="profile_card">
            <VueSlickCarousel
              :arrows="false"
              :dots="false"
              :autoplay="true"
              centerPadding="0"
              :slideShow="1"
              v-if="cards.length"
              dotsClass="custom-dot-class"
            >
              <div
                class="slide_block"
                v-for="(card, index) in cards"
                :key="index"
              >
                <div class="slide_content">
                  <div class="slide_inner">
                    <a
                      class="card_remove icon_remove"
                      @click="
                        deletedCardId = card.id;
                        openConfirm = true;
                      "
                    ></a>
                    <div class="image_block">
                      <img src="@/assets/images/visa.png" alt="" title="" />
                    </div>
                    <div class="card_code">
                      <span> **** </span>
                      <span> **** </span>
                      <span> **** </span>
                      <span> {{ separator(card.card_number) }} </span>
                    </div>
                    <div class="name_row">
                      <div class="card_owner">
                        {{ card.client_name }}
                      </div>
                      <div class="term_block">
                        {{ getExpDate(card.exp_date) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
      <NoCards v-else @attachCard="addCardAction" />
    </div>
    <PopupConfirm
      :openPopup="openConfirm"
      @closePopup="openConfirm = false"
      @submitAction="deleteCard"
      :text="deleteCardText"
    />
  </li>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import NoCards from "./NoCards.vue";
export default {
  data() {
    return {
      deletedCardId: null,
      openConfirm: false,
      hoveredClass: false,
    };
  },
  methods: {
    ...mapActions(["addCard", "getCards", "removeCard", "getNotifications"]),
    async addCardAction() {
      await this.addCard({
        success_url: `${process.env.VUE_APP_BASE_URL}/payment-success`,
        fail_url: `${process.env.VUE_APP_BASE_URL}/payment-fail`,
      }).then(() => {});
      await this.getNotifications();
    },
    async deleteCard() {
      const id = this.deletedCardId;
      await this.removeCard(id).then(() => {});
      await this.getNotifications();
    },
  },
  computed: {
    ...mapGetters(["cards", "deleteCardText"]),
    cards() {
      return this.$store.getters.cards;
    },
    deleteCardText() {
      return this.$store.getters.deleteCardText;
    },
    getExpDate() {
      return (text) => {
        var month = text.slice(-2);
        var year = text[2] + text[3];
        return `${month} / ${year}`;
      };
    },
    separator() {
      return (number) => {
        return number.substr(number.length - 4);
      };
    },
  },
  async created() {
    this.$store.commit("SHOW_LOADING", true);
    await this.getCards();
    setTimeout(() => {
      this.$store.commit("SHOW_LOADING", false);
    }, 300);
  },
  components: { VueSlickCarousel, NoCards },
};
</script>
