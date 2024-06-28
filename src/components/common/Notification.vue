<template>
  <div class="notification_block">
    <!-- @blur="blurEvent" -->
    <div class="notif_inner">
      <div class="head_row">
        <div class="service_title">{{ $t(`Notifications`) }}</div>
        <button
          @click="closeNotifications"
          class="notif_close icon_close"
        ></button>
      </div>
      <div class="notif_list">
        <ul>
          <li
            v-for="(notif, index) in notifications"
            :key="index"
            :class="{ unread: !notif.read_at }"
            @click="!notif.data.read_at ? setAsRead(notif) : false"
          >
            <div class="notif_head">
              <div class="notif_title">{{ notif.data.title }}</div>
              <span
                class="notif_status"
                :class="[
                  {
                    check_notif: notif.data.status === 'success',
                    icon_checked: notif.data.status === 'success',
                    reject_notif: notif.data.status === 'fail',
                    icon_close: notif.data.status === 'fail',
                    processing: notif.data.status === 'info',
                    icon_arrowStroke: notif.data.status === 'info',
                  },
                ]"
              ></span>
            </div>
            <div class="notif_description">{{ notif.data.message }}</div>
            <div class="notif_date">
              {{ getTime(notif.updated_at) }}
              <span>{{ getDate(notif.updated_at) }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="mark_read_block">
        <span @click="setAsReadAll" v-if="notifications.length">
          Mark as read
          <img src="../../assets/images/MarkAllread.svg" alt="" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["notifications"]),
    getTime() {
      return (time) => {
        return this.$moment(time).format("HH:mm");
      };
    },
    getDate() {
      return (time) => {
        return this.$moment(time).format("DD.MM.YY");
      };
    },
  },
  methods: {
    ...mapActions(["markRead", "getNotifications", "markAllRead"]),

    closeNotifications() {
      document.body.classList.remove("notif_opened");
    },
    async setAsRead(notif) {
      try {
        await this.markRead(notif.id);
        await this.getNotifications();
      } catch (error) {
        console.log(error);
      }
    },
    async setAsReadAll() {
      try {
        await this.markAllRead();
        await this.getNotifications();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
