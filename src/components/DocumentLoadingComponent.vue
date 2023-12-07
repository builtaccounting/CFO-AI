<template>
  <span>
    <v-row class="mt-5">
      <v-col cols="12" sm="8" class="mx-auto">
     <v-skeleton-loader
         type="card"
         height="400"
     ></v-skeleton-loader>

  <v-skeleton-loader
      type="card"
      height="400"
  ></v-skeleton-loader>

  <v-skeleton-loader
      type="card"
      height="400"
  ></v-skeleton-loader>
      </v-col>
    </v-row>

  </span>

</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "DocumentLoadingComponent",
	mounted() {
		document.title = 'Loading document...'
	}
})
</script>

<style scoped>

</style>