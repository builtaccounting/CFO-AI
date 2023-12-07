<template>
  <v-card flat color="blue lighten-5" class="pa-2" >


      <apexchart  height="350" :options="chartOptions" :series="series"></apexchart>


  </v-card>

</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      defaults: ""
    },
    data: {
      type: Object
    }
  },
  name: "MixLineChartComponent",
  data() {
    return {



    }
  },
  computed: {


    chartOptions() {

      return {

        chart: {
          type: 'line'

        },
        stroke: {
          width: [4, 4]
        },

        labels: this.labels,
        xaxis: {
          type: 'category'
        },
        yaxis: [{
          show: false
        }]

      }

    },


    labels() {

      return Object.keys(this.data.net_profit.periods);


    },

    series() {

      return [
        {
          name: "Net Profit",
          color: "#6BFFC7",
          data: this.net_profit_series

        },
        {
          name: "Gross Profit",
          color: "#FFB01A",
          data: this.gross_profit_series

        }

      ];

    },


    net_profit_series() {

      let series = [];

      if (this.data.net_profit) {
        const months = Object.keys(this.data.net_profit.periods);

        months.forEach(month => {
          series.push(this.data.net_profit.periods[month]);

        })

      }


      return series;

    },

    gross_profit_series() {

      let series = [];

      if (this.data.gross_profit) {
        const months = Object.keys(this.data.gross_profit.periods);

        months.forEach(month => {
          series.push(this.data.gross_profit.periods[month]);

        })

      }


      return series;

    }


  }
})
</script>

<style scoped>

</style>