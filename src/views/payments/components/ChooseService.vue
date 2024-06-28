<template>
  <div class="payment_service">
    <Step />
    <div class="service_top">
      <div class="service_title">{{ $t(`Choose method`) }}</div>
      <ul class="payment_list">
        <li v-for="(contract, index) in my_contracts" :key="index">
          <div class="item_inner">
            <label>
              <span class="checkbox">
                <input
                  type="checkbox"
                  v-model="checkedServices"
                  :value="contract"
                  name="checkboxbutton"
                />
                <span class="checkbox_button icon_checked">
                  <span class="checkbox_inner">
                    <span class="inner_title">{{ contract.address }}</span>
                    <span class="service_id">{{
                      contract.contract_number
                    }}</span>
                    <span class="service_price"
                      >{{
                        contract.price
                          ? (+contract.price).toLocaleString()
                          : contract.price
                      }}
                      ֏</span
                    >
                  </span>
                </span>
              </span>
            </label>
            <div class="service_type">{{ contract.service_name }}</div>
            <!-- <div class="payment_month">{{ contract.pay_month }}</div> -->
          </div>
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
          class="custom_a"
          :class="{ btn_disabled: !checkedServices.length }"
          @click="checkedServices.length ? nextStep() : false"
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
      checkedServices: [],
    };
  },
  computed: {
    ...mapGetters(["my_contracts", "payment_services"]),
    totalSum() {
      return this.checkedServices.reduce((sum, contract) => {
        return (sum += +contract.price);
      }, 0);
    },
  },
  methods: {
    ...mapActions(["getContracts"]),

    nextStep() {
      if (this.checkedServices.length) {
        this.$store.commit("SET_PAYMENT_SERVICES", this.checkedServices);
        this.$emit("toPayment");
      }
    },
  },
  async created() {
    const storageContractId = localStorage.contract_id
      ? localStorage.contract_id
      : null;
    this.$store.commit("SHOW_LOADING", true);
    await this.getContracts();
    if (this.$route.query && this.$route.query.contract_id) {
      const findContract = this.my_contracts.find(
        (contract) => contract.id === +this.$route.query.contract_id
      );
      if (findContract) {
        this.checkedServices.push(findContract);
      }
    } else if (storageContractId) {
      const findContract = this.my_contracts.find(
        (contract) => contract.id === +storageContractId
      );
      if (findContract) {
        this.checkedServices.push(findContract);
      }
    } else {
      const findContract = this.my_contracts.find((s) => s.main_contract);

      if (findContract) {
        this.contract_id = this.checkedServices.push(findContract);
      } else {
        this.contract_id = this.checkedServices.push(this.my_contracts[0]);
      }
    }
  },
  components: {
    Step,
  },
};
</script>
