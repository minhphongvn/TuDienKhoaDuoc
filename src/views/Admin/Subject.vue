<template>
  <v-sheet class="pa-3" outlined>
    <div class="d-flex justify-space-between align-center mb-3">
      <!-- Ô tìm kiếm -->
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

      <!-- Hộp thoại thêm subject -->
      <div class="d-flex align-center">
        <t-dialog
          v-model="dialog"
          width="500"
          action-label="Thêm"
          title="Thêm subject"
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
      </div>
    </div>

    <!-- Hộp thoại cập nhật subject -->
    <t-dialog
      v-model="dialog2"
      width="500"
      action-label="Cập nhật"
      title="Sửa subject"
      @action="updateSubject"
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

    <!-- Data Table -->
    <v-data-table :headers="headers" :items="listSubject" :search="search">
      <template v-slot:[`item.stt`]="{ item }">
        <span>{{ listSubject.indexOf(item) + 1 }}</span>
      </template>
      <template v-slot:item.name="{ item }">
        <router-link
          class="text-decoration-none font-weight-medium"
          :to="`words/${item.id}`"
          >{{ item.name }}</router-link
        >
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn @click="getEdit(item)" color="purple" class="mr-3" small icon
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
        <!-- <v-btn @click="deleteSubject(item.id)" color="error" small icon
          ><v-icon>mdi-delete</v-icon></v-btn
        > -->
        <verify-dialog
          msg="Bạn có chắc muốn xoá chủ đề này hay không ?"
          icon
          color="error"
          iconsrc="mdi-delete"
        >
          <v-btn
            @click="deleteSubject(item.id)"
            outlined
            color="error"
            text
            depressed
            >Xác nhận xoá</v-btn
          >
        </verify-dialog>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script>
import TDialog from "../../components/TDialog.vue";
import VerifyDialog from "../../components/VerifyDialog.vue";
export default {
  components: { TDialog, VerifyDialog },
  data: () => ({
    subjectName: "",
    search: "",
    headers: [
      { text: "STT", value: "stt" },
      { text: "Name", value: "name" },
      { text: "Tác vụ", align: "center", value: "actions" },
    ],
    currentID: null,
    dialog: false,
    dialog2: false,
  }),
  watch: {
    dialog2(val) {
      if (!val) {
        this.subjectName = "";
      }
    },
    dialog(val) {
      if (!val) {
        this.subjectName = "";
      }
    },
  },
  methods: {
    getEdit(item) {
      this.subjectName = item.name;
      this.currentID = item.id;
      this.dialog2 = true;
    },
    getListSubject() {
      this.$store.dispatch("subject/getListSubject");
    },
    async addSubject() {
      const body = {
        name: this.subjectName,
      };
      await this.$store.dispatch("subject/addSubject", body);

      this.dialog = false;
    },
    updateSubject() {
      this.$store.dispatch("subject/updateSubject", {
        id: this.currentID,
        name: this.subjectName,
      }),
        (this.dialog2 = false);
    },
    deleteSubject(id) {
      this.$store.dispatch("subject/deleteSubject", id);
    },
  },
  computed: {
    listSubject() {
      return this.$store.state.subject.subjects;
    },
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.getListSubject();
  },
};
</script>

<style>
</style>