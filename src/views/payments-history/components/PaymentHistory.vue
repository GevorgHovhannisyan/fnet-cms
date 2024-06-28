<template>
  <div class="payment_history">
    <div class="title_row">
      <div class="service_title">{{ $t(`Payment history`) }}</div>
      <div class="select_block">
        <v-select
          :placeholder="$t(`Filter by`)"
          :options="options"
          @input="selectContract"
          :clearable="false"
          v-model="contract_id"
          :reduce="(contract) => contract.id"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes" class="drop_icon"></span> </template
        ></v-select>
      </div>
    </div>
    <div class="payments_list">
      <ul>
        <li>
          <div class="list_head">
            <div class="date_block">{{ $t(`Payment date`) }}</div>
            <div class="service_block">{{ $t(`Services`) }}</div>
            <div class="contract_block">{{ $t(`Contract`) }}</div>
            <div class="paid_block">{{ $t(`Paid`) }}</div>
            <div class="balance_block">{{ $t(`Balance`) }}</div>
          </div>
        </li>
        <li v-for="(payment, index) in payments.data" :key="index">
          <div class="payment_head">
            <div class="date_block" data-mobile="Ամսաթիվ">
              {{ payment.date }}
            </div>
            <div class="service_block" data-mobile="Ծառայություններ">
              <div class="block_inner">
                <div class="service_name">
                  {{ payment.serviceName }}
                </div>
                <div class="service_description">
                  {{ payment.service_description }}
                </div>
              </div>
            </div>
            <div class="contract_block" data-mobile="Պայմանագիր">
              {{ payment.contractNumber }}
            </div>
            <div class="paid_block" data-mobile="Վճարված">
              <span> {{ payment.price }}֏ </span>
            </div>
            <div class="balance_block" data-mobile="Մնացորդ">
              <span> {{ balance }} ֏</span>
            </div>
          </div>
        </li>

        <li v-if="payments && payments.data && (payments.total > payments.data.length)">
          <Pagination :totalPages="totalPages" @setPage="setPage($event)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      resultCount: 0,
      options: [],
      balance: null,
      contract_id: null
    };
  },
  computed: {
    ...mapGetters(["payments"]),
    payments() {
      return this.$store.getters.payments;
    },
    table_headers() {
      return this.$store.getters.payment_table_headers;
    },
    totalPages() {
      return this.payments.last_page;
    },
  },
  methods: {
    ...mapActions(["getPaymentHistory", "fcoinInfo", "getContracts"]),
   async setPage(pageNumber) {
      this.currentPage = pageNumber;
      const params = {
        page: pageNumber,
      };
      await this.getPaymentHistory(params);
    },
    selectContract(contract) {
      console.log("contract", contract);


    },
  },
  async created() {
        await this.getContracts().then((res) => {
      const contracts = res.data;
      if (contracts.length) {
        contracts.forEach((contract) => {
          this.options.push({id: contract.id,label: contract.contract_number});
        });
        this.contract_id = contracts[0].id;
      }
    });

    const params = {
      page: this.currentPage,
      sort_by: this.contract_id

    };
    await this.getPaymentHistory(params);

    await this.fcoinInfo().then((res) => {
      this.balance = res.data.balance;
    });

    console.log(this.payments);
  },
};
</script>
