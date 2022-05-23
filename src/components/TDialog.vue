<template>
  <v-dialog v-bind="$attrs">
    <v-card class="py-3">
      <v-card-title>{{ $attrs["title"] }}</v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="$emit('action')"
          text
          color="primary"
          :disabled="$attrs['btn-disable']"
          >{{ $attrs["action-label"] }}</v-btn
        >
        <v-btn color="grey" @click="$emit('input', false)" text>Trở lại</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({}),
};
</script>