<template>
  <div>
    <div class="service_title">{{ $t(`Services`) }}</div>
    <ul class="service_list drops_list" v-if="!service_loading">
      <li
        v-for="(service, index) in services"
        :key="index"
        :class="{ opened: service.id === openedServiceID }"
      >
        <a
          class="icon_down drop_button"
          @click.prevent="openDropDown(service.id)"
        >
          <img :src="service.icon_path" alt="" title="" />
          <span>{{ service.name }}</span>
        </a>
        <vue-slide-up-down :active="service.id === openedServiceID">
          <div class="drop_element">
            <ul>
              <li v-for="(pack, indexTr) in service.packages" :key="indexTr">
                <div class="item_inner">
                  <div class="price_block service_title">
                    {{ pack.amount ? pack.amount : "" }} ֏<span>{{
                      $t(`Monthly`)
                    }}</span>
                  </div>
                  <div class="type_row">
                    <div class="type_block">{{ pack.name }}</div>
                    <a class="chanels_list custom_a">{{
                      $t(`Channel list`)
                    }}</a>
                  </div>
                  <div class="characters_block">
                    <span
                      v-for="(
                        provided_services, index
                      ) in pack.provided_services"
                      :key="index"
                    >
                      {{ provided_services.name }}
                    </span>
                  </div>
                  <ul class="possibility_list">
                    <li
                      class="icon_checked"
                      v-for="(advantage, index) in pack.advantages"
                      :key="index"
                    >
                      <span v-html="advantage.name"></span>
                    </li>
                  </ul>
               
                  <button
                    class="activate_button"
                    @click="setService(pack)"
                    :disabled="pack.selected"
                    :class="[
                      { active: pack.selected, icon_checked: pack.selected },
                    ]"
                  >
                    {{ pack.selected ? $t(`Active`) : $t(`Activate`) }}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </vue-slide-up-down>
      </li>
    </ul>

    <ul class="service_list drops_list" v-else>
      <li>
        <v-skeleton-loader v-bind="attrs" type="image"></v-skeleton-loader>
      </li>
      <li>
        <v-skeleton-loader v-bind="attrs" type="image"></v-skeleton-loader>
      </li>

      <li>
        <v-skeleton-loader v-bind="attrs" type="image"></v-skeleton-loader>
      </li>
    </ul>

    <PopupConfirm
      :openPopup="openConfirm"
      @closePopup="openConfirm = false"
      @submitAction="upgradeService($event)"
      :text="activateServiceText"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    service_loading:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      openedServiceID: null,
      active: true,
      active1: false,
      openConfirm: false,
      selectedService: null,
      attrs: {
        class: "mb-6",
        boilerplate: false,
        elevation: 10,
      },
    };
  },
  computed: {
    ...mapGetters(["services", "locale", "user_data"]),

    getImg() {
      return (src) => {
        return require(`../../../assets/images/${src}`);
      };
    },
    activateServiceText() {
      return this.$store.getters.activate_service_text;
    },
  },
  methods: {
    ...mapActions(["sendFcoinOffer"]),
    toggle() {
      this.active = !this.active;
    },
    toggle1() {
      this.active1 = !this.active1;
    },
    openDropDown(id) {
      if (this.openedServiceID === id) {
        this.openedServiceID = null;
      } else {
        this.openedServiceID = id;
      }
    },
    setService(pack) {
      this.selectedService = pack;
      this.openConfirm = true;
    },
    upgradeService() {
      const service_data = {
        service: this.selectedService.id,
        phone: this.user_data.phone,
      }
      this.openConfirm = false;

      this.$store.dispatch("upgradeService", service_data).then(res => {
        if(res.data.success) {
          this.$router.push('/payment-success').catch(() => {})
        }
      }).catch(() => {
          this.$router.push('/payment-fail').catch(() => {})

      });
    },
  },

  async created() {
    if (this.$route.query && this.$route.query.service) {
      this.openDropDown(+this.$route.query.service);
    }

    console.log('services', this.services);
  },
};
</script>
