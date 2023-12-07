<script>
import ReportTemplate from "@/components/mgmt-report/ReportTemplate.vue";
import {getAccessToken, getUser} from "@/utils";

export default {
  name: "dashboard.vue",
  components: { ReportTemplate },
  data() {
    return {};
  },
  mounted() {
    if (!getAccessToken() || !getUser()) {
      this.$router.push("/login");
    }
	  this.$store.commit("updateChartData");

  },
};
</script>

<template>
  <!--DASHBOARD AREA -->
  <div class="grey lighten-2">
    <report-template></report-template>
  </div>
</template>

<style scoped></style>
