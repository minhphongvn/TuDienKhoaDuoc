<template>
  <v-app>
    <v-app-bar elevation="3" color="white" flat dense fixed clipped-left app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-bold"
        ><router-link class="text-decoration-none success--text" to="/admin"
          >lhu medict <v-icon color="success">mdi-leaf</v-icon></router-link
        ></v-app-bar-title
      >
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!$vuetify.breakpoint.mobile"
      clipped
      app
    >
      <v-list>
        <v-list-item-content class="justify-center">
          <user-info></user-info>
        </v-list-item-content>
        <v-list-item-group color="primary">
          <v-list-item v-if="user.is_superuser" :to="{ name: 'Admin' }">
            <v-icon class="mr-2">mdi-account-hard-hat</v-icon>
            <v-list-item-title>Trang quản trị</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Learned' }">
            <v-icon class="mr-2">mdi-pill</v-icon>
            <v-list-item-title>Các từ đã học</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <div>
          <router-view />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserInfo from "../components/UserInfo.vue";
export default {
  data: () => ({
    danhsachkythi: [],
    drawer: false,
  }),
  methods: {
    // async layDanhSachPhongThi() {
    //   try {
    //     this.$store.commit("setLoading", true);
    //     const { data } = await hocsinApi.layDanhSach();
    //     this.danhsachkythi = data;
    //     this.$store.commit("setLoading", false);
    //   } catch (error) {
    //     if (error.response) {
    //       this.loading = false;
    //       this.$showAlert(error.response.data.detail, "error");
    //     }
    //   }
    // },
  },
  created() {
    // this.layDanhSachPhongThi();
  },
  components: { UserInfo },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-main {
  background-color: #ecf0f5;
}
</style>