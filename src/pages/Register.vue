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
            <v-card class="pa-4">
              <v-card-subtitle class="text-h6">Tạo tài khoản</v-card-subtitle>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    required
                    v-model="username"
                    :rules="[rules.required, rules.username]"
                    placeholder="Tên người dùng (không dấu và khoảng trắng)"
                    type="text"
                    prepend-inner-icon="mdi-account"
                    outlined
                    dense
                  ></v-text-field>
                  <v-text-field
                    required
                    v-model="fullName"
                    :rules="[rules.required]"
                    placeholder="Họ tên"
                    type="text"
                    prepend-inner-icon="mdi-card-account-details"
                    outlined
                    dense
                  ></v-text-field>
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
                  <v-text-field
                    required
                    v-model="password"
                    :rules="[rules.required, rules.min]"
                    placeholder="Mật khẩu"
                    :type="showPass ? 'text' : 'password'"
                    prepend-inner-icon="mdi-lock"
                    outlined
                    dense
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                  <v-btn
                    :loading="loading"
                    :disabled="!valid"
                    @click.prevent="register"
                    color="primary"
                    block
                    >Đăng ký</v-btn
                  >
                </v-form>
                <div class="mt-4 text-center">
                  <div>Bạn đã có tài khoản?</div>
                  <router-link to="/login" class="text-decoration-none"
                    >Đăng nhập</router-link
                  >
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
    username: "",
    fullName: "",
    email: "",
    password: "",
    showPass: false,
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
    loading: false,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
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
    async register() {
      if (this.validate) {
        try {
          this.loading = true;
          const body = {
            student_id: this.username,
            email: this.email,
            full_name: this.fullName,
            password: this.password,
            is_active: true,
          };
          // submit form to server/API here...
          await auth.register(body);
          this.showAlert("Đăng ký thành công!", "success");
          // localStorage.setItem("awt", JSON.stringify(data.token));
          // this.$store.commit("setToken", data.token);
          setTimeout(() => this.$router.push({ name: "Login" }), 1000);
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

<style></style>
