<template>
  <v-container v-show="$store.state.user">
    <h1 class="font-weight-bold" v-if="$store.state.user">
      Hello, {{ $store.state.user.first_name }}
    </h1>
    <h3 class="font-weight-bold nanum" style="font-size: 2.3rem">Welcome to the Built AI Accountant</h3>
    <h3 class="font-weight-bold mt-10">Recently Added</h3>
    <v-row class="py-5" v-if="reports.length > 0">
      <v-card
          hover
          max-width="300"
          class="text-center mx-3 py-5"
          v-for="(i, idx) in reports"

          :key="i.name"

          @click="viewMode(i)"
      >
        <v-card-title
            class="font-weight-bold text-center text-capitalize"
            style="font-size: 0.9rem"
        >
          {{ i.name.split(":")[0] }}
        </v-card-title>
        <v-card-text>
          <p>{{ i.name.split(":")[1] }}</p>
        </v-card-text>
      </v-card>
    </v-row>

    <p class="font-weight-light text-capitalize" v-else>
      You have no recent documents.
    </p>


    <v-row align="center">
      <v-col cols="6" class="pa-5">
        <v-img :src="require('../../public/img/Data report-bro.png')" alt="img" height="600"></v-img>
      </v-col>

      <v-col cols="6">
        <h2 class="nanum my-auto text-center" style="font-size: 2rem">Reporting just got easier!</h2>
        <template>
          <v-timeline>
            <v-timeline-item color="blue darken-4"><p class="fw-bold">Click <span
                class="blue darken-4 white--text pa-1 rounded-pill px-2">+New Report</span> on the top left corner of
              the screen</p></v-timeline-item>
            <v-timeline-item class="fw-bold" color="blue darken-4">Select the time period you want a report on.
            </v-timeline-item>
            <v-timeline-item class="text-right fw-bold" color="blue darken-4">
              Let the AI Accountant generate comprehensive management reports for you.
            </v-timeline-item>
            <v-timeline-item class="fw-bold" color="blue darken-4">View, download, share and edit your report.
            </v-timeline-item>
          </v-timeline>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import eventBus from "@/utils";

export default {
  name: "home",
  data() {
    return {
      loading: false,
      items: [],
	    reports: [],
    };
  },
  computed: {
    recentReports() {
      return this.$store.getters.getRecentDocuments;
    },
  },
  methods: {


    viewMode(doc) {
      doc = this.$store.state.reports.find((r) => r.id === doc.id);
      this.$store.commit("SET_CURRENT_REPORT", doc);
      this.$store.commit("TOGGLE_SIDEBAR", false);
      this.$router.push(`/reports/${doc.id}`);
    },
  },
	mounted() {
		eventBus.$on("getReports", (data) => {
			this.reports = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4);

		})
	}
};
</script>


<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");

.nanum {
  font-family: "Nanum Pen Script" !important;
}

</style>
