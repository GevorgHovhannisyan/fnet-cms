<template>
  <div class="edit_page">
    <div class="title_row">
      <router-link
        custom
        class="icon_arrowStroke service_title custom_a"
        to="/auto-payment"
        v-slot="{ navigate }"
      >
        <a @click="navigate"> {{ $t(`Choose method`) }}</a>
      </router-link>
    </div>
    <div class="edit_inner">
      <div class="autopayment_date">
        <span> {{ $t(`Auto payment day`) }}` </span>
        <v-select
          class="select2"
          :placeholder="$t(`Sort by`)"
          :options="options"
          v-model="payment_data.day"
          :clearable="false"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes" class="drop_icon"></span>
          </template>
        </v-select>
      </div>
      <div class="service_top">
        <div class="edit_pay_section_title">{{ $t(`Choose method`) }}</div>
        <ul class="payment_list">
          <li v-for="(contract, index) in auto_pay_contracts" :key="index">
            <div class="item_inner">
              <label>
                <span class="checkbox">
                  <input
                    type="checkbox"
                    name="checkboxbutton"
                    :value="contract"
                    v-model="checkedServices"
                  />
                  <span class="checkbox_button icon_checked">
                    <span class="checkbox_inner">
                      <span class="inner_title">{{ contract.address }}</span>
                      <span class="service_id">{{
                        contract.contract_number
                      }}</span>
                      <span class="service_price">{{ contract.price }} ֏</span>
                    </span>
                  </span>
                </span>
              </label>
              <div class="service_type">{{ contract.service_name }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="service_middle">
        <div class="title_row">
          <div class="edit_pay_section_title">{{ cards.length? $t(`Choose card`): $t(`Please add new card`) }}</div>
          <a class="add_payment custom_a" @click="addCardAction"
            >{{ $t(`Add new card`) }}<span class="icon_plus"></span
          ></a>
        </div>
        <ul class="radio_list">
          <li v-for="(card, index) in cards" :key="index">
            <label>
              <span class="radio">
                <input
                  type="radio"
                  name="radiobutton"
                  :value="card.id"
                  v-model="payment_data.card_id"
                />
                <span class="radio_button">
                  <span class="radio_check"></span>
                  <img src="images/visa.png" alt="" title="" />
                  <span class="user_id">{{ card.card_number }}</span>

                  <span class="user_name">{{ card.client_name }}</span>
                </span>
              </span>
            </label>
          </li>
        </ul>
      </div>
      <div class="bottom_block">
        <div class="bottom_title">{{ $t(`Total for pay`) }}</div>
        <div class="price_row">
          <div class="total_sum">
            {{ totalSum ? totalSum.toLocaleString() : totalSum }} ֏
          </div>
          <a
            :class="{ btn_disabled: !validAutoPayment }"
            @click="validAutoPayment ? addAutoPayment() : false"
            class="custom_a"
            >{{ $t(`Next to pay`) }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      checkedServices: [],
      options: [],
      payment_data: {
        contracts: [],
        card_id: null,
        total_price: null,
        day: null,
      },
    };
  },
  computed: {
    ...mapGetters(["auto_pay_contracts", "cards", "payment_popup_text"]),

    totalSum() {
      return this.checkedServices.reduce((sum, service) => {
        return (sum += +service.price);
      }, 0);
    },
    validAutoPayment() {
      return (
        this.checkedServices.length &&
        this.payment_data.card_id &&
        this.payment_data.day
      );
    },
  },
  methods: {
    ...mapActions([
      "removeAutoPayment",
      "getAutpPayContracts",
      "getCards",
      "addCard",
      "createAutoPayment",
    ]),
    async addCardAction() {
      await this.addCard({
        success_url: `${process.env.VUE_APP_BASE_URL}/payment-success`,
        fail_url: `${process.env.VUE_APP_BASE_URL}/payment-fail`,
      });
    },
    async addAutoPayment() {
      const payload = {
        card_id: this.payment_data.card_id,
        total_price: this.totalSum,
        day: this.payment_data.day,
      };

      payload.contracts = this.checkedServices.map((s) => {
        return s.id;
      });

      await this.createAutoPayment(payload).then((res) => {
        if (res.data.success) {
          this.$router.push({ name: "auto-payment" });
        }
      });
    },
  },
  async created() {
    this.$store.commit("SHOW_LOADING", true);
    await this.getCards();
    await this.getAutpPayContracts();
    const month_options = [];
    for (let i = 1; i <= 28; i++) {
      month_options.push(i);
    }
    this.options = month_options;
  },
};
</script>

<style lang="scss">
@import "./autoPayment.scss";
</style>
