<template>
  <div class="product_section">
    <div class="tab_section">
      <div class="title_row">
        <div class="service_title">FCoin {{ $t(`Gifts`) }}</div>
        <div class="tab_buttons">
          <ul>
            <li>
              <a
                @click="selected_tab = 1"
                :class="{ selected: selected_tab === 1 }"
                data-tab="tab_1"
                class="custom_a"
              >
                {{ $t(`All`) }}</a
              >
            </li>
            <li>
              <a
                @click="selected_tab = 2"
                :class="{ selected: selected_tab === 2 }"
                data-tab="tab_2"
                class="custom_a"
              >
                {{ $t(`My gifts`) }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="tabs_container">
        <div class="tab_block tab_1" :class="{ selected: selected_tab === 1 }">
          <div class="product_list">
            <ul>
              <li v-for="(gift, index) in gifts" :key="index">
                <div class="item_inner combo_hover">
                  <a href="" class="image_block combo_link"
                    ><img :src="gift.image_path" alt="" title=""
                  /></a>
                  <div class="info_block">
                    <div class="info_title">
                      <a href="" class="combo_link">{{ gift.name }}</a>
                    </div>
                    <div class="change_coins">
                      <div class="nearest_gift">
                        {{ my_fcoins.balance }} <span>/ {{ gift.price }}</span>
                      </div>
                      <div class="gift_line">
                        <span
                          :style="{ width: getProductWidth(gift.price) }"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="change_btn"
                    :class="[
                      { button_disabled: gift.price > my_fcoins.balance },
                    ]"
                    :disabled="gift.active"
                    @click="changeGiftPop(gift)"
                  >
                    {{ gift.active ? $t(`Changed`) : $t(`Change`) }}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab_block tab_2" :class="{ selected: selected_tab === 2 }">
          <div class="product_list">
            <ul>
              <li v-for="(my_gifts, index) in myGifts" :key="index">
                <div class="item_inner combo_hover">
                  <a href="" class="image_block combo_link"
                    ><img
                      :src="my_gifts.fcoinproducts.image_path"
                      alt=""
                      title=""
                  /></a>
                  <div class="info_block">
                    <div class="info_title">
                      <a class="combo_link">{{
                        my_gifts.fcoinproducts.name
                      }}</a>
                    </div>

                    <div class="change_coins">
                      <div class="nearest_gift">
                        {{ my_fcoins.balance
                        }}<span>/ {{ my_gifts.fcoinproducts.price }}</span>
                      </div>
                      <div class="gift_line">
                        <span
                          :style="{
                            width: getProductWidth(
                              my_gifts.fcoinproducts.price
                            ),
                          }"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="gift_offer">
          <span>{{ $t(`What you want`) }}: {{ $t(`Suggest your gift`) }}</span>
          <a @click="openSuggestPopup = true" class="custom_a">{{
            $t(`Suggest gift`)
          }}</a>
        </div>
      </div>
    </div>
    <PopupConfirm
      :openPopup="openConfirm"
      @closePopup="openConfirm = false"
      @submitAction="changeGifts"
      :text="activateServiceText"
    />

    <PopupFields
      :openPopup="openSuggestPopup"
      @closePopup="openSuggestPopup = false"
      className="change_fcoin"
      :class="{ 'has-error': showSuggestionErr }"
    >
      <div class="change_title section_title">{{ $t(`Suggest gift`) }}</div>
      <div class="change_description">
        Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա
        կենտրոնանալ տեքստի ձևավորման վրա:
      </div>
      <span class="error_hint">Պետք է լրացվի դաշտերից գոնե մեկը</span>

      <div class="field_block">
        <div class="field_title">{{ $t(`Gift name`) }}</div>
        <input
          v-model="suggestObj.gift_name"
          type="text"
          name="name"
          autocomplete="off"
          placeholder="Օրինակ` Razer DeathAdder V2 Gaming Mouse"
          data-validation="required"
        />
      </div>
      <div class="field_block">
        <div class="field_title">{{ $t(`Url`) }}</div>
        <input
          v-model="suggestObj.url"
          type="text"
          name="name"
          autocomplete="off"
          placeholder="https://www.amazon.com/Razer-DeathAdder-Gaming-Mouse-Programmable"
          data-validation="required"
        />
      </div>
      <button
        :class="{ btn_disabled: !validSuggestion }"
        @click="validSuggestion ? suggestGift() : false"
        type="submit"
        class="active_btn"
      >
        {{ $t(`Send invite`) }}
      </button>
    </PopupFields>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      selected_tab: 1,
      openConfirm: false,
      openSuggestPopup: false,
      selected_gift: null,
      suggestObj: {
        gift_name: null,
        url: null,
      },
      showSuggestionErr: false,
    };
  },
  async created() {
    await this.getFcoinGifts();
    await this.getFcoinOrders();
  },
  computed: {
    ...mapGetters(["my_fcoins", "gifts", "locale"]),

    myGifts() {
      return this.$store.getters.my_gifts;
    },
    activateServiceText() {
      if (this.selected_gift) {
        return this.$store.getters.change_gift_text({
          price: this.selected_gift.price,
          name: this.selected_gift.name,
        });
      } else {
        return {};
      }
    },
    getImg() {
      return (src) => {
        if (src) {
          return require(`../../../assets/images/${src}`);
        } else {
          return require(`../../../assets/images/product2.jpg`);
        }
      };
    },
    getProductWidth() {
      return (price) => {
        const percent = (this.my_fcoins.balance / price) * 100;
        if (percent >= 100) {
          return `100%`;
        } else {
          return `${percent}%`;
        }
      };
    },
    validSuggestion() {
      return this.suggestObj.gift_name || this.suggestObj.url;
    },
  },
  methods: {
    ...mapActions([
      "changeGift",
      "getFcoinGifts",
      "getFcoinOrders",
      "sendFcoinOffer",
    ]),

    async changeGifts() {
      await this.changeGift({
        product_id: this.selected_gift.id,
      });
    },
    async suggestGift() {
      const payload = {};

      if (this.suggestObj.gift_name || this.suggestObj.url) {
        if (this.suggestObj.gift_name) payload.name = this.suggestObj.gift_name;
        if (this.suggestObj.url) payload.url = this.suggestObj.url;

        await this.sendFcoinOffer(payload).then((response) => {
          if (response.data.success) {
            this.openSuggestPopup = false;
            document.body.classList.remove("popup_opened");
          }
        });
      } else {
        this.showSuggestionErr = true;
      }
    },
    changeGiftPop(gift) {
      if (gift.price <= this.my_fcoins.balance) {
        this.selected_gift = gift;
        this.openConfirm = true;
      }
    },
  },
  watch: {
    async locale() {
      await this.getFcoinGifts();
      await this.getFcoinOrders();
    },
  },
};
</script>
