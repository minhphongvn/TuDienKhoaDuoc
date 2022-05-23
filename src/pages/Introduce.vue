<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row dense no-gutters>
          <v-col cols="12" md="4">
            <v-card class="pt-4 px-4" flat>
              <v-card-title class="text-h4 font-weight-bold success--text"
                >lhu medict
                <v-icon color="success">mdi-leaf</v-icon></v-card-title
              >
              <v-card-subtitle class="text-h6 font-weight-light"
                >Từ điển khoa dược LHU</v-card-subtitle
              >
            </v-card>
          </v-col>
          <v-col>
            <div
              class="
                px-md-0 px-4
                d-flex
                justify-start justify-md-end
                align-center
              "
            >
              <v-card class="pa-md-4" flat>
                <v-card-text class="mt-md-6">
                  <v-btn to="/register" color="success lighten-1" depressed
                    >Đăng ký</v-btn
                  >
                  <v-btn to="/login" class="ml-2" color="primary" depressed
                    >Đăng nhập</v-btn
                  >
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <div class="pa-4">
          <div class="d-flex justify-center align-center">
            <div class="col-md-6">
              <v-sheet width="100%">
                <div class="text-h3">tra cứu nhanh chóng</div>
              </v-sheet>
            </div>
            <div class="col-md-6">
              <v-img src="../assets/medicine.jpg"></v-img>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      duration: 5000,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>