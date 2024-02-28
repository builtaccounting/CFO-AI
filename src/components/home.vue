<template>
	<v-container v-show="$store.state.user">
		<h1 class="font-weight-bold" v-if="$store.state.user">
			Hello, {{ $store.state.user.first_name }}
		</h1>
		<h3 class="font-weight-bold nanum" style="font-size: 2.3rem">Welcome to the Built AI Accountant</h3>

		<v-row dense>
			<v-col cols="12" sm="8">
				<v-alert
					class="mt-3"
					prominent
					icon="mdi-chart-donut"
					text
					color="blue"
				>
					<v-row dense>
						<v-col cols="12" sm="9">
							<h2 class="mb-0">Usage Summary</h2>
							<strong class="font-weight-black"
							>{{ storeReports.length }}/10 SMS
								Sent</strong
							>
						</v-col>
						<v-col cols="12" sm="3">
							<v-btn
								outlined
								block
								x-large
								color="blue darken-4"
								dark
								depressed
								rounded
								@click="eventBus.$emit('newReport')"
							>New Report
							</v-btn
							>
						</v-col>
					</v-row>
					<v-row dense>
						<v-col cols="12">
							<v-progress-linear
								:value=" storeReports.length * 10"
								color="blue"
								height="20"
								class="rounded-lg mt-2"
								rounded
							></v-progress-linear>
						</v-col>
					</v-row>
				</v-alert>

				<v-row dense>
					<v-col cols="12">
						<h3 class="font-weight-bold mt-5">Recently Added</h3>
						<v-row class="py-5" v-if="storeReports.length > 0">
							<v-card
								width="200"
								max-height="300"
								class="ma-3 py-4"
								v-for="(i, idx) in storeReports"

								:key="i.name"

								@click="viewMode(i)"
							>
								<v-avatar
									rounded
									:color="i.color"
									class="ml-4"
								>

									<v-icon color="white">mdi-shimmer</v-icon>

								</v-avatar>
								<v-card-title
									class="font-weight-bold text-capitalize"
								>
									<h5>{{ i.name.split(":")[0] }}</h5>
								</v-card-title>
								<v-card-subtitle>
									<p class="grey--text">{{ i.business_name }}</p>
									<p class="text-capitalize">{{ i.period.replace('_', ' ') }}</p>
								</v-card-subtitle>
								<v-card-actions style="position: absolute; bottom: 1%" class="mx-2">
									<p class="grey--text fw-bold mb-5">{{ moment(i.created_at).format("ddd, Mo Do YYYY") }}</p>
								</v-card-actions>
							</v-card>
						</v-row>
						<v-row v-else>
							<v-col cols="12" class="">
								<p class="font-weight-light text-capitalize">
									You haven't generated any reports yet.
								</p>
								<v-img :src="require('../../public/img/Data report-bro.png')" alt="img" height="700"></v-img>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12" sm="4">
				<v-card class="mt-3" flat color="blue darken-4">
					<v-card-text class="white--text text-center pt-6 pb-6">
						<h1 class="text-h4 font-weight-light mb-0">
							{{ 10 - storeReports.length }}
						</h1>
						<small>Current Reports balance</small>
						<v-btn
							class="mt-5"
							block
							dark
							color="green"
							depressed
							x-large
							rounded
						>Buy Report Credits
						</v-btn
						>
					</v-card-text>
				</v-card>
				<h2 class="nanum my-auto text-center" style="font-size: 2rem">Reporting just got easier!</h2>
				<template>
					<v-timeline>
						<v-timeline-item color="blue darken-4"><p class="fw-bold">Click on <br/><span
							class="blue darken-4 white--text pa-1 rounded-pill px-2">New Report</span></p></v-timeline-item>
						<v-timeline-item class="fw-bold" color="blue darken-4">Select the time period and business you want a report
							for.
						</v-timeline-item>
						<v-timeline-item class="text-right fw-bold" color="blue darken-4">
							Let Built CFO AI generate a comprehensive management report for you.
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
import moment from "moment";

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
		moment() {
			return moment
		},
		eventBus() {
			return eventBus
		},
		storeReports() {
			return this.$store.getters.getRecentDocuments
		},
	},
	methods: {

		viewMode(doc) {
			doc = this.$store.state.reports.find((r) => r.uuid === doc.uuid);
			this.$store.commit("SET_CURRENT_REPORT", doc);
			this.$store.commit("TOGGLE_SIDEBAR", false);
			this.$router.push(`/reports/${doc.uuid}`);
		},
	},
	mounted() {
		this.$store.dispatch('getReports')
	}
};
</script>


<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");

.nanum {
	font-family: "Nanum Pen Script" !important;
}

</style>
