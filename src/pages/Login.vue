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
              <v-card-subtitle class="text-h6">Đăng nhập</v-card-subtitle>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    required
                    v-model="username"
                    :rules="[rules.required]"
                    placeholder="Username"
                    type="text"
                    prepend-inner-icon="mdi-account"
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
                    @click.prevent="login"
                    color="primary"
                    block
                    >Đăng nhập</v-btn
                  >
                </v-form>
                <div class="mt-4 text-center">
                  <router-link to="/recovery" class="text-decoration-none"
                    >Quên mật khẩu ?</router-link
                  >
                  <div>Bạn chưa có tài khoản?</div>
                  <router-link to="/register" class="text-decoration-none"
                    >Tạo tài khoản mới</router-link
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
    loading: false,
    username: "",
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
    async login() {
      if (this.validate) {
        try {
          this.loading = true;
          // submit form to server/API here...
          const { access_token } = await auth.login({
            username: this.username,
            password: this.password,
          });
          console.log(access_token);
          localStorage.setItem("awt", access_token);
          const data = await auth.getUser();
          this.$store.commit("setUser", data);
          this.$store.commit("setToken", true);
          this.showAlert("Đăng nhập thành công!", "success");
          setTimeout(
            () =>
              this.$router.push({
                name: data.is_superuser ? "Admin" : "HomePage",
              }),
            1000
          );
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