<template>
  <div class="services_inner">
    <div v-if="!service_loading">
      <div class="title_row">
        <div class="service_title">{{ $t(`My services`) }}</div>
        <div class="select_block">
          <v-select
            :placeholder="$t(`Sort by`)"
            :options="contract_options"
            v-model="contract_id"
            :reduce="(contract) => contract.id"
            @input="changeContract"
            :clearable="false"
          >
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes" class="drop_icon"></span> </template
          ></v-select>
        </div>
      </div>
      <div class="order_list">
        <ul>
          <li>
            <div class="list_head">
              <div class="service_name">{{ $t(`Service`) }}</div>
              <div class="package_name">{{ $t(`Package`) }}</div>
              <div class="inclusions_block">{{ $t(`Inclusions`) }}</div>
              <div class="payment_subject">{{ $t(`Monthly fee`) }}</div>
              <div class="status_block">
                {{ $t(`Status`) }}

                <span class="icon_quest"></span>
              </div>
            </div>
          </li>
          <li>
            <div class="order_head">
              <div class="service_name" data-mobile="Ծառայություն">
                {{ service && service.name ? service.name : "" }}
              </div>
              <div class="package_name" data-mobile="Փաթեթ">
                <div>
                  {{
                    contract_service && contract_service.service_package
                      ? contract_service.service_package
                      : ""
                  }}
                  <!-- <span class="icon_fPlus"></span> -->
                </div>
              </div>
              <div class="inclusions_block" data-mobile="Ներառումներ">
                <div
                  class="inclusions_inner"
                  v-if="
                    service &&
                    service.packages &&
                    service.packages.length &&
                    service.packages[0].provided_services.length
                  "
                >
                  <div
                    v-for="pr_service in service.packages[0].provided_services"
                    :key="pr_service.id"
                  >
                    <span>{{ pr_service.name }} </span>
                  </div>
                </div>
              </div>
              <div
                class="payment_subject"
                data-mobile="Ամսավճար"
                v-if="
                  service &&
                  service.packages &&
                  service.packages.length &&
                  service.packages[0].provided_services.length
                "
              >
                {{ service.packages[0].amount }} ֏
              </div>
              <div class="status_block status_on" data-mobile="Ստատուս">
                <span>{{ $t(`On`) }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <v-skeleton-loader
        v-bind="attrs"
        type="heading, table-row-divider, table-row-divider,table-row-divider, button"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    service_loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      contract_options: [],
      contract_id: null,
      service: null,
      attrs: {
        class: "mb-6",
        boilerplate: false,
        elevation: 10,
      },
    };
  },
  computed: {
    ...mapGetters(["my_contracts", "contract_service", "services", "locale"]),
    getDate() {
      const date = this.contract_service
        ? this.contract_service.payment_date
        : null;
      if (date) {
        return this.$moment(this.contract_service.payment_date).format(
          "DD.MM.YY"
        );
      } else {
        return "";
      }
    },
    totalSum() {
      return this.contract_service && this.contract_service.price
        ? +this.contract_service.price.toLocaleString()
        : 0;
    },
  },
  methods: {
    ...mapActions(["getContracts", "getServices", "getContract"]),
    async changeContract() {
      await this.getContract(this.contract_id);
    },
    payDept() {
      this.$router.push({
        path: "/payments",
        query: {
          contract_id: this.contract_id,
        },
      });
    },
  },
  async created() {
    await this.getContracts();
    await this.getServices();

    if (this.my_contracts.length) {
      this.contract_options = this.my_contracts.map((contract) => {
        return {
          id: contract.id,
          label: contract.contract_number,
        };
      });

      this.contract_id = this.contract_options[0].id;
      await this.getContract(this.contract_id);
      const service = this.services.find(
        (service) => service.id === this.contract_service.service_id
      );

      this.service = service;
    }
  },
  watch: {
    async locale() {
      await this.getServices();

      await this.getContract(this.contract_id);
      const service = this.services.find(
        (service) => service.id === this.contract_service.service_id
      );
      this.service = service;
    },
  },
};
</script>
