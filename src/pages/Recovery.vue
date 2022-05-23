<template>
  <v-app>
    <v-main class="grey lighten-4">
      <v-container class="pt-10">
        <v-row justify="center" align="center" no-gutters>
          <v-col class="text-center" cols="12" md="4">
            <div
              class="text-h4 py-5 font-weight-bold justify-center success--text"
            >
              lhu medict
              <v-icon color="success">mdi-leaf</v-icon>
            </div>
            <v-card class="pa-4" v-if="!sended">
              <v-card-subtitle class="text-h6">Quên mật khẩu</v-card-subtitle>
              <v-card-text>
                <div class="text-start mb-3">
                  Hãy nhập đúng địa chỉ email của bạn để lấy lại mật khẩu.
                </div>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    required
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    placeholder="Email"
                    type="text"
                    prepend-inner-icon="mdi-email"
                    outlined
                    dense
                  ></v-text-field>
                  <v-btn
                    :loading="loading"
                    :disabled="!valid"
                    @click.prevent="sendEmail"
                    color="primary"
                    block
                    >Gửi</v-btn
                  >
                </v-form>
                <div class="mt-4 text-center">
                  <div>Bạn chưa có tài khoản?</div>
                  <router-link to="/register" class="text-decoration-none"
                    >Tạo tài khoản mới</router-link
                  >
                </div>
              </v-card-text>
            </v-card>
            <v-card v-else>
              <v-card-text>
                <v-avatar size="80" circle color="success">
                  <v-icon color="white" size="60">mdi-check</v-icon>
                </v-avatar>
                <div class="text-body-1 mt-3 px-10">
                  Đã gửi thành công ! <br />
                  Hãy kiểm tra email của bạn.
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar
          :color="snackbarColor"
          top
          v-model="snackbar"
          :timeout="2000"
        >
          {{ snackbarMessage }}
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import auth from "../api/auth.api";
export default {
  data: () => ({
    loading: false,
    email: "",
    sended: false,
    valid: true,
    rules: {
      required: (value) => !!value || "Vui lòng nhập.",
      min: (v) => v.length >= 8 || "Ít nhất 8 ký tự",
      email: (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Vui lòng nhập đúng định dạng email",
      username: (v) =>
        /^[a-zA-Z0-9]*$/.test(v) || "Vui lòng nhập đúng định dạng",
      emailMatch: () => `The email and password you entered don't match`,
      phone: (v) => v.length >= 10 || "Số điện thoại chỉ 10 số.",
    },
    snackbar: false,
    snackbarMessage: "",
    snackbarColor: "",
  }),
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    showAlert(msg, color) {
      this.snackbar = true;
      this.snackbarColor = color;
      this.snackbarMessage = msg;
    },
    async sendEmail() {
      if (this.validate) {
        try {
          this.loading = true;
          // submit form to server/API here...
          await auth.passwordRecovery(this.email);
          this.loading = false;
          this.sended = true;
        } catch (error) {
          if (error.response) {
            this.loading = false;
            this.showAlert(error.response.data.detail, "error");
          }
        }
      }
    },
  },
};
</script>

<style>
</style>