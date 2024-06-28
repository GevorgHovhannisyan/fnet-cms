<template>
  <li class="person_info">
    <div class="item_inner">
      <div class="info_inner">
        <div class="info_top">
          <div class="service_title">{{ $t(`Profile info`) }}</div>
          <div class="info_row">
            <div class="image_block">
              <img :src="getImage" alt="" title="" />
            </div>
            <div class="info_block">
              <div class="name_block">
                {{ user_data.first_name }} {{ user_data.last_name }}
              </div>
              <div class="user_number">
                {{ user_data && user_data.phone ? user_data.phone : "" }}
              </div>
              <div class="buttons_row">
                <input
                  type="file"
                  style="display: none"
                  name="file"
                  ref="update_avatar_inputs"
                  @change="uploadImage"
                  multiple
                />
                <div>
                  <a
                    @click="$refs.update_avatar_inputs.click()"
                    class="image_change custom_a"
                    >{{ $t(`Change avatar`) }}</a
                  >
                </div>
                <div>
                  <a
                    @click="user_data.image ? (openConfirmImage = true) : false"
                    class="icon_remove image_remove custom_a"
                    >{{ $t(`Remove avatar`) }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info_bottom" v-if="email">
          <ValidationObserver
            slim
            ref="change_email_validation"
            v-slot="{ handleSubmit }"
          >
            <form @submit.prevent="handleSubmit(changeEmail)">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors }"
              >
                <div class="field_block" :class="{ 'has-error': errors[0] }">
                  <div class="field_title">{{ $t(`Email`) }}</div>
                  <input
                    type="text"
                    name="name"
                    v-model="email"
                    autocomplete="off"
                    :placeholder="$t(`Email address`)"
                  />
                  <span class="error_hint">
                    <span class="standard_hint">{{ errors[0] }}</span>
                    <span class="individual_hint">սխալ էլ. հասցե</span>
                  </span>
                </div>
              </ValidationProvider>

              <button
                class="validate_btn pp_btn"
                @click="showChangeEmailPop = true"
              >
                {{ $t(`Change email`) }}
              </button>
            </form>
          </ValidationObserver>
        </div>

        <div class="info_bottom new_email" v-else>
          <button
            class="pp_btn"
            data-popup="email_popup"
            @click="showChangeEmailPop = true"
          >
            {{ $t(`Add email`) }}
          </button>
        </div>
      </div>
    </div>

    
    <PopupDeleteAvatar
      :openPopup="openConfirmImage"
      @submitAction="deleteImageAction"
      @closePopup="closePopup"
      :text="deleteImageText"
    />

    <ChangeEmailPopup
      :showPopup="showChangeEmailPop"
      @close="closePopupEmail"
    />
  </li>
</template>

<script>
import { mapActions } from "vuex";
import ChangeEmailPopup from "../popups/ChangeEmailPopup.vue";
import PopupDeleteAvatar from "../popups/PopupDeleteAvatar.vue";

export default {
  data() {
    return {
      email: null,
      openConfirmImage: false,
      showChangeEmailPop: false,
    };
  },
  computed: {
    user_data() {
      return this.$store.getters.user_data;
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
    deleteImageText() {
      return this.$store.getters.image_remove_text;
    },
  },
  methods: {
    ...mapActions([
      "changeUserEmail",
      "changeImage",
      "deleteImage",
      "getNotifications",
    ]),

    async changeEmail() {
      const data = {
        email: this.email,
      };
      try {
        await this.changeUserEmail(data);
        await this.getNotifications();
      } catch (error) {
        console.log(error);
      }
    },

    async uploadImage(event) {
      this.$store.commit("SHOW_LOADING", true);

      var input = event.target.files[0];
      try {
        await this.changeImage(input);
        await this.getNotifications();
      } catch (error) {
        console.log(error.response);
      }
    },

    async deleteImageAction() {
      this.$store.commit("SHOW_LOADING", true);

      try {
        await this.deleteImage();
        await this.getNotifications();
      } catch (error) {
        console.log(error);
      }
    },
    closePopup() {
      this.openConfirmImage = false;
      document.body.classList.remove("delete_avatar_popup");
    },
    closePopupEmail(){
      document.body.classList.remove("popup_opened");
      this.showChangeEmailPop = false
    }
  },
  created() {
    if (this.user_data && this.user_data.email) {
      this.email = this.user_data.email;
    } else {
      setTimeout(() => {
        if (this.user_data && this.user_data.email) {
          this.email = this.user_data.email;
        }
      }, 500);
    }
  },
  watch: {
    user_data: {
      handler: function () {
        this.email = this.user_data.email;
      },
      deep: true,
    },
  },
  components: {
    ChangeEmailPopup,
    PopupDeleteAvatar,
  },
};
</script>
