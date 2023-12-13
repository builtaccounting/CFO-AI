<template>
  <v-card flat :color="color" class="pa-2">
    <apexchart :options="chartOptions" :series="series"></apexchart>
  </v-card>

</template>

<script>
import {defineComponent} from 'vue'
import moment from "moment";

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
  name: "BarchartComponent",
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar',
          height: 300
        },
        xaxis: {
          type: 'category',
          labels: {
            formatter: function (val) {
              return val
            }
          }
        },
        tooltip: {
          x: {
            formatter: function (val) {
              return val
            }
          }
        },
        dataLabels:{
          enabled:false
        },
        legend:{
          show:false
        },
        plotOptions:{
          bar:{
            columnWidth: '70%',
            borderRadius:"5",
            isFunnel3d: true
          }
        }
      },


    }
  },

  computed: {

    series() {
      return [{
        name: this.title.replaceAll("_"," "),
        data: this.chartData
      }]

    },

    chartData() {

      let list = [];
      if (this.data && this.data.periods) {

        const months = Object.keys(this.data.periods);

        months.forEach(month => {
          list.push({
            x: month,
            y: this.data.periods[month]
          });

        })

      }

      return list;

    }

  }

})
</script>


<style scoped>

</style>