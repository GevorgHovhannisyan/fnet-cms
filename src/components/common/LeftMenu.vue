<template>
  <div class="left_inner">
    <div class="info_head">
      <Logo />
      <LngSwitcher lngBlock="profile_lg" />
    </div>
    <div class="personal_info">
      <div class="image_row">
        <div class="image_block">
          <img :src="getImage" alt="" title="" />
        </div>
        <button
          @click="openNotifications"
          class="icon_notification notif_btn notif_active"
          :class="{ no_notif: hasUnread }"
        ></button>
      </div>
      <div class="name_block">
        {{ getFullName }}
      </div>
      <router-link custom class="custom_a" to="/profile" v-slot="{ navigate }">
        <a @click="navigate"> {{ $t(`Personal page`) }}</a>
      </router-link>
    </div>
    <div class="info_content">
      <ul>
        <li v-for="(item, index) in menuItems" :key="index">
          <router-link
            :to="item.url"
            :class="[
              { selected: $route.name === item.name },

              `icon_${item.icon}${$route.name === item.name ? 'Active' : ''}`,
            ]"
            custom
            v-slot="{ navigate, href }"
          >
            <a :href="href" class="custom_a" @click="navigate">
              {{ $t(`${item.title}`) }}
            </a>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="info_bottom">
      <div class="bottom_row">
        <router-link custom to="/" v-slot="{ navigate }">
          <span class="back_main custom_a" @click="navigate">
            Fnet {{ $t(`Main page`) }}</span
          >
        </router-link>
        <a class="log_out icon_logOut custom_a" @click="logOut">{{
          $t(`Logout`)
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["notifications", "user_data"]),

    menuItems() {
      return this.$store.getters.menu_items;
    },
    activeLink() {
      return (path) => {
        return this.$route.path === path ? " selected" : "";
      };
    },
    getImage() {
      if (!this.user_data || !this.user_data.image) {
        return require(`@/assets/images/NoAvatar.png`);
      } else if (this.user_data && this.user_data.image) {
        return `${process.env.VUE_APP_IMG_URL}/${this.user_data.image}`;
      } else {
        return require(`@/assets/images/NoAvatar.png`);
      }
    },
    getFullName() {
      if (this.user_data && this.user_data.first_name) {
        return `${this.user_data.first_name} ${this.user_data.last_name}`;
      } else {
        return "";
      }
    },
    hasUnread() {
      const hasUnread = this.notifications.find((n) => !n.read_at);
      return hasUnread ? false : true;
    },
  },
  methods: {
    ...mapActions(["getNotifications"]),
    openNotifications() {
      document.body.classList.add("notif_opened");
    },
    logOut() {
      this.$store.dispatch("userLogout");
    },
  },
  async created() {
    await this.getNotifications();
  },
};
</script>
