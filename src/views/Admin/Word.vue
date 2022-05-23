<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-3">
      <!--       
      <div>
        <v-text-field
          v-model="search"
          outlined
          dense
          hide-details="auto"
          append-icon="mdi-magnify"
          placeholder="Tìm kiếm"
        ></v-text-field>
      </div>

      <div class="d-flex align-center">
        <t-dialog
          v-model="dialog"
          width="500"
          action-label="Thêm"
          title="Thêm word"
          @action="addSubject"
          :btn-disable="!subjectName"
        >
          <v-text-field
            v-model="subjectName"
            class="mr-2"
            dense
            outlined
            hide-details="auto"
            placeholder="Nhập tên subject..."
          ></v-text-field>
        </t-dialog>
        <v-btn @click="dialog = true" color="success" depressed>
          Thêm subject</v-btn
        >
      </div> -->
    </div>

    <v-data-table
      :headers="headers"
      :items="listWord"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          @click="
            dialog2 = true;
            wordName = item.name;
          "
          class="mr-2"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteSubject(item.id)" class="mr-2">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// import TDialog from "../../components/TDialog.vue";
export default {
  // components: { TDialog },
  data() {
    return {
      search: "",
      headers: [
        { text: "STT", value: "stt" },
        { text: "Name", value: "name" },
        { text: "Tác vụ", align: "center", value: "actions" },
      ],
      currentID: null,
      dialog: false,
      dialog2: false,
    };
  },
  methods: {
    // addWord() {
    //   const body = {
    //     name: this.subjectName,
    //   };
    //   this.$store.dispatch("addSubject", subject);
    //   this.subjectName = "";
    //   this.dialog = false;
    // },
    // deleteSubject(id) {
    //   this.$store.dispatch("deleteSubject", id);
    // },
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      this.$store.dispatch("getListWord", id);
    }
  },
  computed: {
    listWord() {
      return this.$store.state.words;
    },
  },
};
</script>

<style>
</style>