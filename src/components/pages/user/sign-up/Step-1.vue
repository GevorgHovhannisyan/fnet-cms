<template>
  <div>
    <div class="form_description">
      {{ $t("Enter your contract number") }}
    </div>
    <ValidationObserver ref="step1_validation" v-slot="{ handleSubmit }" slim>
      <form class="reg-step-1" @submit.prevent="handleSubmit(sendCode)">
        <ValidationProvider name="Contract" rules="required">
          <div class="field_block" :class="{ 'has-error': wrongContract }">
            <div class="field_title">
              {{ $t("Contract number") }}
            </div>
            <input
              type="text"
              autocomplete="off"
              new-password="off"
              placeholder="XX XX XXX"
              v-model="contract_number"
              @input="checkNumber"
            />
            <span class="error_hint">{{ wrongContract }}</span>
            <span class="icon_info check_input"></span>
          </div>
        </ValidationProvider>

        <ValidationProvider name="Phone" v-slot="{ errors }">
          <div class="field_block" :class="{ 'has-error': errors[0] }">
            <div class="field_title">
              {{ $t("Phone number") }}
            </div>

            <vue-tel-input
              type="tel"
              name="phone"
              autoFormat
              :disabled="disablePhone"
              :custom-validate="/^[0-9 ]*$/"
              @validate="validatePhone"
              @input="inputPhone"
            ></vue-tel-input>
            <!-- @input="updateValue" -->
            <span class="error_hint">{{ errors[0] }}</span>
            <span class="icon_info check_input"></span>
          </div>
        </ValidationProvider>

        <div class="info_block disabled">
          {{ $t("An SMS notification will be sent to the phone number") }}
        </div>
        <button
          :disabled="disabledBtn"
          :class="{ btn_disabled: disabledBtn }"
          class="validate_btn"
        >
          {{ $t("Send code") }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      disabledBtn: false,
      disablePhone: true,
      phone_disabled: false,
      contract_number: null,
      phone: null,
      wrongContract: null,
      // wrong_phone: null,
    };
  },
  methods: {
    ...mapActions(["checkContractNumber", "checkPhoneNumber", "sendPhone"]),

    checkNumber() {
      this.contract_number = +this.contract_number.replace(/[^+0-9]/g, "");
      this.wrongContract = null;

      if (this.contract_number.toString().length === 7) {
        this.checkContractNumber({
          contract_number: this.contract_number,
        })
          .then((res) => {
            if (res.status === 200) {
              this.disablePhone = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.disablePhone = true;
      }
    },
    sendCodePhone() {
      if (this.contract_number.toString().length === 7) {
        this.sendPhone({
          phone: this.phone,
        }).then((res) => {
          if (res.data.success) {
            this.$store.commit("STEP_UP", 2);
            this.$router.push("/verify-phone").catch(() => {});
          }
        });
      } else {
        this.wrongContract = "Contract number must be 7 digits.";
      }
    },
    sendCode() {
      this.checkPhoneNumber({
        phone: this.phone,
      })
        .then((res) => {
          if (res.status === 200) {
            this.$store.commit("SAVE_CONTRACT_PHONE", {
              contract_number: this.contract_number,
              phone: this.phone,
            });

            this.sendCodePhone();
          }
        })
        .catch((err) => {
          const error = err.response.data ? err.response.data : null;
          if (error && error.error === "this number not registered") {
            this.$store.commit("SAVE_CONTRACT_PHONE", {
              contract_number: this.contract_number,
              phone: this.phone,
            });

            this.sendCodePhone();
          }

          if (error.errors && error.errors.phone) {
            this.$refs.step1_validation.setErrors({
              Phone: error.errors.phone,
            });
          }
        });

      // this.$emit("approve", 2);
    },
    validatePhone(event) {
      if (event.valid) {
        this.phone = event.number;
      }
    },
    inputPhone(event) {
      this.$refs.step1_validation.reset();
      this.phone = event;
    },
  },
};
</script>
