<template>

  <v-card flat :color="color" class="pa-2 full-height">
    <apexchart :options="chartOptions" :series="series"></apexchart>
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
    color: {
      type: String,
      default: ""
    }
  },
  name: "BarchartComponent",
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 300,
          toolbar: {
            show: false,
          },
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
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        plotOptions: {
          bar: {
            columnWidth: '70%',
            borderRadius: "5",
            isFunnel3d: true
          }
        }
      },


    }
  },

  methods: {
    monthTest(items) {

      let sumkeys = 0;

      this.months.forEach(month => {

        const test = items[month];

        console.log(test)

        if (test) {
          sumkeys += Object.keys(test).length;
        }

      });

      return sumkeys > 0;

    }
  },
  computed: {

    series() {
      return [{
        name: this.title.replaceAll("_", " "),
        data: this.chartData
      }]

    },

    chartData() {

      let list = [];
      if (this.data && this.data.periods) {


        const monthTest = this.monthTest(this.data.periods);


        const mainKeys = monthTest ? this.months : Object.keys(this.data.periods);

        mainKeys.forEach(month => {
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