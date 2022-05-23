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
      <v-btn color="success" to="/medictionary" icon>
        <v-icon>mdi-desktop-mac</v-icon>
      </v-btn>
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
          <v-list-item :to="{ name: 'Dashboard' }">
            <v-icon class="mr-2">mdi-view-dashboard</v-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-subheader class="font-weight-medium">Quản lý từ điển</v-subheader>
          <v-list-item :to="{ name: 'Subject' }">
            <v-icon class="mr-2">mdi-book-open-variant</v-icon>
            <v-list-item-title>Chủ đề</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'WordAdmin' }">
            <v-icon class="mr-2">mdi-alphabet-latin</v-icon>
            <v-list-item-title>Từ vựng</v-list-item-title>
          </v-list-item>
          <v-subheader class="font-weight-medium"
            >Quản lý người dùng</v-subheader
          >
          <v-list-item :to="{ name: 'UserManangement' }">
            <v-icon class="mr-2">mdi-account-group</v-icon>
            <v-list-item-title>Người dùng</v-list-item-title>
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
    drawer: false,
  }),
  components: { UserInfo },
};
</script>

<style lang="scss" scoped>
.bg-main {
  background-color: #ecf0f5;
}
</style>