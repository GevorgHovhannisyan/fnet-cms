<template>
  <div class="contracts_page">
    <a class="add_contracts custom_a" @click="openAddContractPopup = true"
      >{{ $t(`Attach contract`) }} <span class="icon_plus"></span
    ></a>
    <ul class="contracts_list">
      <li v-for="(contract, index) in contracts" :key="index">
        <div class="item_inner">
          <!-- <a
            @click="openDeletePopup(contract)"
            class="contract_remove icon_remove"
          ></a> -->
          <div class="item_top">
            <div
              class="icon_star contract_status"
              @click="setMain(contract.id)"
              :class="[
                {
                  main_cotract: contract.main_contract,
                  icon_starPass: !contract.main_contract,
                },
              ]"
            >
              {{ contract.main_contract ? $t(`Main`) : "" }}
            </div>
            <div class="service_title">{{ contract.contract_number }}</div>
            <div class="contract_info">
              <span>{{ $t(`Address`) }}</span>
              <div>{{ contract.address }}</div>
            </div>
            <div class="contract_info">
              <span>{{ $t(`Services`) }}</span>
              <div>{{ contract.services }}</div>
            </div>
          </div>
          <div class="item_bottom" v-if="contract.file">
            <a
              class="icon_paperDownload"
              target="_blank"
              download
              :href="contract.file_path"
            >
              <span>
                {{ contract.file }}
              </span>
            </a>
          </div>
        </div>
      </li>
    </ul>
    <PopupFields
      :openPopup="openAddContractPopup"
      className="add_contract_popup"
      @closePopup="openAddContractPopup = false"
      :class="{ 'has-error': showSuggestionErr }"
    >
      <div class="change_title section_title">{{ $t(`Attach contract`) }}</div>
      <div class="change_description">
        Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա
        կենտրոնանալ տեքստի ձևավորման վրա:
      </div>
      <span class="error_hint">{{showSuggestionErr}}</span>

      <div class="field_block">
        <div class="field_title">{{ $t(`Contract number`) }}</div>
        <input
          v-model="contract_number"
          type="text"
          name="name"
          autocomplete="off"
          placeholder="Օրինակ` 1234567"
          @input="showSuggestionErr = null"
        />
      </div>
      <button
        :class="{ btn_disabled: !contract_number }"
        @click="contract_number ? createContract() : false"
        type="submit"
        class="active_btn"
      >
        {{ $t(`Add contract`) }}
      </button>
    </PopupFields>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      openAddContractPopup: false,
      contract_number: null,
      showSuggestionErr: null
    };
  },
  computed: {
    contracts() {
      return this.$store.getters.my_contracts;
    },
  },
  methods: {
    ...mapActions([
      "setMainContract",
      "getContracts",
      "addContract",
    ]),

    async setMain(id) {
      try {
        this.$store.commit("SHOW_LOADING", true);
        await this.setMainContract(id);
      } catch (error) {
        console.log(error);
      }
    },
    async createContract() {
      this.openAddContractPopup = false;
      try {
        const payload = { contract_number: this.contract_number };
        await this.addContract(payload).then(() => {
          this.openAddContractPopup = false;
          document.body.classList.remove("popup_opened");
        });
      } catch (error) {
        if(error && error.response.data) {
          this.showSuggestionErr = error.response.data.message;
        }
      }
    },
  },
  created() {
    this.$store.commit("SHOW_LOADING", true);
    this.getContracts();
  },
};
</script>

<style lang="scss">
@import "./contracts.scss";
</style>
