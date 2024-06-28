<template>
  <div class="auto_payment">
    <div class="title_row" v-if="auto_payments.length">
      <div class="service_title">{{ $t(`Auto payment`) }}</div>
      <router-link
        custom
        to="/create-auto-payment"
        class="enter_btn"
        v-slot="{ navigate, href }"
      >
        <a class="add_payment" :href="href" @click="navigate"
          >{{ $t(`Add auto payment`) }} <span class="icon_plus"></span
        ></a>
      </router-link>
    </div>
    <ul>
      <div v-if="auto_payments.length">
        <li v-for="(payment, index) in auto_payments" :key="index">
          <div class="item_inner">
            <div class="user_address">
              {{ payment.contract_list[0].address }}
            </div>
            <div class="user_id">
              ID <span>{{ payment.contract_list[0].contract_number }}</span>
            </div>
            <div class="setting_buttons">
              <button
                class="icon_remove remove_btn"
                @click="openPopup(payment)"
              >
                {{ $t(`Remove`) }}
              </button>
              <button
                class="icon_edit edit_btn"
                @click="$router.push(`/edit-auto-payment/${payment.id}`)"
              >
                {{ $t(`Edit`) }}
              </button>
            </div>
          </div>
        </li>
      </div>
      <div v-else>
        <EmptyAutoPayment />
      </div>
      <!-- <SuccessPayment /> -->
    </ul>

    <PopupConfirm
      :openPopup="openConfirm"
      @closePopup="openConfirm = false"
      @submitAction="removePayment"
      :text="payment_popup_text"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EmptyAutoPayment from "./components/EmptyPayments.vue";
// import SuccessPayment from "./components/SuccessPayment.vue";

export default {
  data() {
    return {
      openConfirm: false,
      deleted_payment_id: null,
    };
  },
  computed: {
    ...mapGetters(["auto_payments", "payment_popup_text"]),
  },
  methods: {
    ...mapActions(["removeAutoPayment", "getAutpPays"]),

    openPopup(item) {
      this.openConfirm = true;
      this.deleted_payment_id = item.id;
    },
    async removePayment() {
      try {
        await this.removeAutoPayment(this.deleted_payment_id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.$store.commit("SHOW_LOADING", true);
    await this.getAutpPays();
  },
  components: {
    EmptyAutoPayment,
    // SuccessPayment
  },
};
</script>

<style lang="scss">
@import "./autoPayment.scss";
</style>
