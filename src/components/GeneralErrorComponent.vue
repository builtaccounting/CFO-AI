<template>
  <v-snackbar
      color="red"
      v-if="$store.state.generalMessage"
      v-model="$store.state.showGeneralMessage"

      transition="slide-x-reverse-transition"
  >

    <h3>{{$store.state.generalMessage.message}}</h3>

    <ul
        v-if="$store.state.generalMessage && $store.state.generalMessage.errors"
        v-for="key in keys"
        :key="key"
    >

      <li>{{$store.state.generalMessage.errors[key][0]}}</li>

    </ul>

    <template v-slot:action="{ attrs }">
      <v-btn
          text
          dark
          v-bind="attrs"
          color="red"
          @click="$store.state.showGeneralMessage = false"
          rounded
      >
        Okay
      </v-btn>
    </template>
  </v-snackbar>

</template>

<script>
export default {
  name: "GeneralErrorComponent",
  computed:{
    showError(){
      return this.$store.state.showGeneralMessage;

    },

    keys(){

      return this.$store.state.generalMessage && this.$store.state.generalMessage.errors ? Object.keys(this.$store.state.generalMessage.errors) : [];

    }

  },
  watch:{
    showError(){

    }
  }


}
</script>

<style scoped>

</style>