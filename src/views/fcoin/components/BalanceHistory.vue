<template>
  <div class="fcoin_section">
    <div class="left_side">
      <div class="fcoin_block">
        <div class="fcoin_inner">
          <div class="service_title">FCoin {{ $t(`Balance`) }}</div>
          <div class="coin_quantity">
            {{ my_fcoins.balance }}<span>FCoins</span>
          </div>
          <div class="field_row">
            <div>
              <div class="item_inner">
                <span>{{ my_fcoins.referrals }}</span>
                <span>Referal</span>
              </div>
            </div>
            <div>
              <div class="item_inner">
                <span>{{ my_fcoins.exchanged }}</span>
                <span>{{ $t(`Exchanged`) }}</span>
              </div>
            </div>
          </div>
          <div class="fcoin_bottom">
            <div class="bottom_title">{{ $t(`Invite friend`) }}</div>
            <div class="copy_from">
              <span class="ref_link">{{ my_fcoins.referral_url }}</span>
              <button
                class="copy_btn"
                :class="icon"
                @click="copyCode(ref_link)"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right_side">
      <div class="right_inner">
        <div class="service_title">Fcoin {{ $t(`History`) }}</div>
        <div class="tab_section">
          <div class="tab_buttons">
            <ul>
              <li v-for="(h_tab, index) in history_tabs" :key="index">
                <a
                  class="custom_a"
                  :class="{ selected: selected_h_tab === h_tab.id }"
                  :data-tab="`tab_${h_tab.id}`"
                  @click="selected_h_tab = h_tab.id"
                  >{{ h_tab.title }}</a
                >
              </li>
            </ul>
          </div>
          <div class="tabs_container">
            <div class="tab_block tab_1 selected" v-show="selected_h_tab === 1">
              <div class="invited_friends" v-if="fcoin_orders.length">
                <div class="overall_row">
                  <div class="overall_title">Ընդհանուր</div>
                  <div class="overall_coins">{{ totalSpentFcoins }} Fcoin</div>
                </div>
                <div class="friends_list">
                  <ul>
                    <li v-for="(order, index) in fcoin_orders" :key="index">
                      <div class="name_block">{{ order.customer }}</div>
                      <div
                        class="status_block"
                        :class="{
                          'icon_checked checked': order.status === 3,
                          'icon_close error': order.status === 2,
                          'icon_arrowStroke processing': order.status === 1,
                          'icon_failed failed': order.status === 5,
                        }"
                      ></div>
                      <div class="coins_block">
                        {{ order.fcoinproducts.price }} Fcoin
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="friend_invite" v-else>
                <div class="invite_title">
                  {{ $t(`Opps`) }}
                </div>
                <a href="" class="invite_link">{{ $t(`Invite friend`) }} </a>
              </div>
            </div>
            <div class="tab_block tab_2" v-show="selected_h_tab === 2"></div>
            <div class="tab_block tab_3" v-show="selected_h_tab === 3"></div>
            <div class="tab_block tab_4" v-show="selected_h_tab === 4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipBoard } from "@/utils/utils";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      selected_h_tab: 1,
      ref_link: "www.fnet.am/fcoin:referal1234",
      icon: "icon_contentCopy",
    };
  },
  computed: {
    ...mapGetters([
      "my_fcoins",
      "fcoin_orders",
      "history",
      "history_tabs",
      "gift_tabs",
    ]),
    totalSpentFcoins() {
      let total = 0;

      this.fcoin_orders.map((f) => {
        total = total + f.fcoinproducts.price;
      });

      return total;
    },
  },
  async mounted() {
    this.$store.commit("SHOW_LOADING", true);
    await this.fcoinInfo();
    setTimeout(() => {
      this.$store.commit("SHOW_LOADING", false);
    }, 300);
  },
  methods: {
    ...mapActions(["fcoinInfo"]),

    copyCode() {
      const area = document.querySelector(".ref_link");
      const text = area.innerText;
      copyToClipBoard(text);
      this.icon = "icon_checked";
      setTimeout(() => {
        this.icon = "icon_contentCopy";
      }, 1500);
    },
  },
};
</script>
