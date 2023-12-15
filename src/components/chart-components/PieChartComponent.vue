<template>
	<v-card flat :color="color" class="pa-2">
		<apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
	</v-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
	props: {
		data: {
			type: Object
		},
		title: {
			type: String,
			default: ""
		},
		color:{
			type: String,
      default: ""
		}
	},
	name: "PieChartComponent",
	data() {
		return {}
	},
	computed: {


		chartOptions() {

			return {
				chart: {
					width: 600,
					type: 'pie',
				},
        legend: {
          position: 'bottom'
        },

				colors: ['#FF5733', '#33FF57', '#5733FF', '#FFC933', '#33FFC9', '#C933FF', '#FF33C9', '#C9FF33', '#33C9FF', '#FF5733', '#a4b3ff', '#E91E63'],
				labels: this.labels,
				responsive: [{
					breakpoint: 200,
					options: {
						chart: {
							width: 600
						},

					}
				}]
			}
		},

		series() {

			return this.chartData.series

		},

		labels() {

			return this.chartData.labels;

		},

		chartData() {

			let series = [];
			let labels = [];

			if (this.data.accounts) {
				const months = Object.keys(this.data.accounts);

				months.forEach(month => {
					series.push(this.data.accounts[month]);
					labels.push(month)

				})

			}

			return {
				series,
				labels
			};

		}
	}
})
</script>

<style scoped>

</style>