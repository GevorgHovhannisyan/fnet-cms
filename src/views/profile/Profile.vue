<template>
  <div class="profile_page">
    <ul class="profile_list">
      <ProfileInfo />
      <AttachedCards />
      <ChangePassword />
    </ul>
  </div>
</template>

<script>
import ProfileInfo from "./components/ProfileInfo.vue";
import AttachedCards from "./components/AttachedCards.vue";
import ChangePassword from "./components/ChangePassword.vue";

export default {
  components: {
    ProfileInfo,
    AttachedCards,
    ChangePassword,
  },
};
</script>

<style lang="scss">
@import "./profile.scss";
</style>
