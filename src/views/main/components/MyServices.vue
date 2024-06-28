<template>
  <div class="my_serivces">
    <div class="services_inner">
      <div v-if="!my_service_loading">
        <div class="title_row">
          <div class="service_title">{{ $t(`My services`) }}</div>
          <div class="select_block">
            <v-select
              class="select2"
              :placeholder="$t(`Sort by`)"
              :options="contract_options"
              v-model="contract_id"
              :reduce="(contract) => contract.id"
              @input="changeContract"
              :clearable="false"
            >
              <template #open-indicator="{ attributes }">
                <span v-bind="attributes" class="drop_icon"></span>
              </template>
            </v-select>
          </div>
        </div>
        <div class="order_list">
          <ul>
            <li>
              <div class="list_head">
                <div class="service_name">{{ $t(`Service`) }}</div>
                <div class="package_name">{{ $t(`Package`) }}</div>
                <div class="payment_subject">{{ $t(`Owing`) }}</div>
                <div class="status_block">
                  {{ $t(`Status`) }}

                  <span class="icon_quest"></span>
                </div>
              </div>
            </li>
            <li>
              <div class="order_head">
                <div class="service_name" data-mobile="Ծառայություն">
                  {{ contract_service && contract_service.service_name }}
                </div>
                <div class="package_name" data-mobile="Փաթեթ">
                  <div>
                    {{
                      contract_service && contract_service.service_package
                        ? contract_service.service_package
                        : "Basic"
                    }}
                    <!-- <span class="icon_fPlus"></span> -->
                  </div>
                </div>
                <div class="payment_subject" data-mobile="Վճարման ենթակա">
                  {{ contract_service && contract_service.price }} ֏
                </div>
                <div class="status_block status_on" data-mobile="Ստատուս">
                  <span>Միացված</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="payment_row">
            <div class="last_payment">
              <!-- {{ $t(`Last payment`) }} <span>????</span> -->
            </div>
            <div class="next_payment">
              {{ $t(`Next payment`) }} <span>{{ getDate }}</span>
            </div>
          </div>
        </div>
        <div class="payment_block">
          <div class="payment_info">
            {{ $t(`To be paid`, [`${getDate}`]) }}
          </div>
          <div class="pay_row">
            <div class="payment_amount">{{ totalSum }} ֏</div>
            <button @click="payDept">{{ $t(`Pay total debt`) }}</button>
          </div>
        </div>
      </div>
      <div v-else>
        <v-skeleton-loader
          v-bind="attrs"
          type="heading, table-row-divider, table-row-divider, table-row-divider,table-row-divider, button"
        ></v-skeleton-loader>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      contract_options: [],
      contract_id: null,
      attrs: {
        class: "mb-6",
        boilerplate: false,
        elevation: 10,
      },
      my_service_loading: false,
    };
  },
  computed: {
    ...mapGetters(["my_contracts", "contract_service", "locale"]),
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
        ? this.contract_service.price.toLocaleString()
        : 0;
    },
  },
  methods: {
    ...mapActions(["getContracts", "getContract"]),
    changeContract() {
      localStorage.setItem("contract_id", this.contract_id);
      this.getContract(this.contract_id);
    },
    dropdownShouldOpen() {
      return true;
    },
    payDept() {
      this.$router.push({
        path: "/payments",
        query: {
          contract_id: this.contract_id,
        },
      });
    },
    async fetchContracts() {
      console.log(6665);
      const storageContractId = localStorage.contract_id
        ? localStorage.contract_id
        : null;

      this.my_service_loading = true;
      await this.getContracts();
      if (this.my_contracts.length) {
        this.contract_options = this.my_contracts.map((contract) => {
          return {
            id: contract.id,
            label: contract.contract_number,
          };
        });

        if (storageContractId) {
          this.contract_id = +storageContractId;
        } else {

          const findContract = this.my_contracts.find((s) => s.main_contract);
          if (findContract) {
            this.contract_id = findContract.id;
          } else {
            this.contract_id = this.my_contracts[0].id;
          }
        }
        await this.getContract(this.contract_id).then(() => {
          this.my_service_loading = false;
        });
      }
    },
  },
  created() {
    this.fetchContracts();
  },
  watch: {
    async locale() {
      await this.fetchContracts();
    },
  },
};
</script>
