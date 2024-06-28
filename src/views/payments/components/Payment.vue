<template>
  <div class="choose_card">
    <Step :allChecked="true" />
    <div class="service_top">
      <div class="service_title">{{ $t(`Choose card`) }}</div>
      <div class="attached_cards">{{ $t(`Attached cards`) }}</div>
      <ul class="payment_list">
        <li v-for="(card, index) in cards" :key="index">
          <label>
            <span class="radio">
              <input
                type="radio"
                :value="card.id"
                v-model="card_id"
                name="radiobutton"
              />
              <span class="radio_button">
                <span class="radio_check"></span>
                <img src="@/assets/images/visa.png" alt="" title="" />
                <span class="user_id">{{ card.card_number }}</span>
                <span class="user_name">{{ card.client_name }}</span>
              </span>
            </span>
          </label>
        </li>
        <li>
          <label>
            <span class="radio">
              <input
                type="radio"
                :value="0"
                v-model="card_id"
                name="radiobutton"
              />
              <span class="radio_button">
                <span class="radio_check"></span>
                <span class="new_card">{{ $t(`With new card`) }}</span>
              </span>
            </span>
          </label>
        </li>
      </ul>
      <div class="save_card">
        <label>
          <span class="checkbox">
            <input
              type="checkbox"
              :disabled="card_id !== 0"
              v-model="recurring"
              name="checkboxbutton"
            />
            <span class="checkbox_button icon_checked">{{
              $t(`Save card after pay`)
            }}</span>
          </span>
        </label>
      </div>
      <div class="automatic_payment">
        <router-link
          custom
          to="/auto-payment"
          class="enter_btn"
          v-slot="{ navigate, href }"
        >
          <a class="icon_right custom_a" :href="href" @click="navigate">
            <span class="icon_union">{{ $t(`Auto payment`) }}</span>
          </a>
        </router-link>
      </div>
    </div>
    <div class="bottom_block">
      <div class="bottom_title">{{ $t(`Total for pay`) }}</div>
      <div class="price_row">
        <div class="total_sum">
          {{ totalSum ? totalSum.toLocaleString() : totalSum }} ֏
        </div>
        <a
          class="custom_a"
          :class="{ btn_disabled: !validPayment }"
          @click="validPayment ? payService() : false"
          >{{ $t(`Next to pay`) }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Step from "./Step.vue";

export default {
  data() {
    return {
      card_id: null,
      recurring: false,
      price: 0,
    };
  },
  components: {
    Step,
  },
  methods: {
    ...mapActions(["getCards", "payForService"]),
    async payService() {
      const payment_services = localStorage.getItem("payment_services")
        ? JSON.parse(localStorage.getItem("payment_services"))
        : null;

      if (payment_services) {
        const contracts = payment_services.map((service) => service.id);
        await this.payForService({
          contracts,
          price: this.totalSum,
          card: this.card_id,
          recurring: this.recurring ? 1 : 0,
          success_url: `${process.env.VUE_APP_BASE_URL}/payment-success`,
          fail_url: `${process.env.VUE_APP_BASE_URL}/payment-fail`,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["cards"]),
    payment_services() {
      return this.$store.getters.ready_payment;
    },
    totalSum() {
      const payment_services = localStorage.getItem("payment_services")
        ? JSON.parse(localStorage.getItem("payment_services"))
        : null;
      return payment_services.reduce((sum, service) => {
        return (sum += +service.price);
      }, 0);
    },
    validPayment() {
      return this.card_id !== null;
    },
  },
  watch: {
    card_id(id) {
      if (id !== 0) {
        this.recurring = false;
      }
    },
  },
  async created() {
    await this.getCards();
  },
};
</script>
