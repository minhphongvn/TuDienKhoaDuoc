<template>
  <div class="mx-auto">
    <div class="d-flex pa-3">
      <v-avatar color="#014aac">
        <span class="white--text text-h6">A</span>
      </v-avatar>
      <div class="ml-2">
        <div class="text-body-1 font-weight-medium">
          {{ user.full_name }}
        </div>
        <p class="text-subtitle-2 font-weight-regular">
          {{ user.email }}
        </p>
        <verify-dialog
          :width="300"
          color="error darken-2"
          block
          small
          iconsrc="mdi-logout"
          label="Đăng xuất"
          depressed
          msg="Bạn có chắc muốn đăng xuất hay không?"
        >
          <v-btn color="error darken-2" @click="DangXuat" dark depressed>
            Đăng xuất
          </v-btn>
        </verify-dialog>
      </div>
    </div>
    <v-divider class="mt-3"></v-divider>
  </div>
</template>

<script>
import VerifyDialog from "../components/VerifyDialog.vue";
export default {
  methods: {
    DangXuat() {
      this.$store.dispatch("DangXuat");
    },
  },
  components: { VerifyDialog },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
</style>