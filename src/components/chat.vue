<script>
export default {
  name: "chat",
  props: ["chatting"],
};
</script>

<template>
  <!--CHAT AREA-->
  <v-container v-if="chatting">
    <v-card height="90vh" class="mb-6"></v-card>
    <v-row align="end">
      <v-text-field
        filled
        class="overflow-hidden"
        density="compact"
        flat
        hide-details
        rounded
        placeholder="Chat with your document"
        variant="solo-filled"
      ></v-text-field>
    </v-row>
  </v-container>
</template>

<style scoped></style>
