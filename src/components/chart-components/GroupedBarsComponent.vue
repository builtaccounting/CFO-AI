<template>
  <v-card flat :color="color" class="pa-5">
    <apexchart type="bar" height="400" :options="chartOptions" :series="series"></apexchart>
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
  name: "GroupedBarsComponent",
  data() {
    return {

      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
  },

  computed: {

    chartOptions() {

      let groupList = [];
      const dataAndAccounts = this.data.periods_and_accounts;
      this.months.forEach(month => {


        const dataKeys = dataAndAccounts[month] ? Object.keys(dataAndAccounts[month]) : null;

        if (dataKeys) {
          let cols = dataKeys.length;


          groupList.push({
            title: month.substring(0,3),
            cols: cols
          });

        }

      })

      return {

        chart: {
          type: 'bar',
          height: 380
        },
        plotOptions: {
          bar: {
            columnWidth: '40%',
            borderRadius: "5",
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          enabled: false,
          type: 'category',
          labels: {
            style: {
              fontSize: "9px"
            },
            enabled: false,
            formatter: function (val) {
              return val.substring(0, 25)+"...";
            }
          },
          group: {
            style: {
              fontSize: '20px',
              fontWeight: 800,
            },
            groups: groupList
          }
        },
        title: {
          text: 'Expense trends',
        },
        tooltip: {
          x: {
            formatter: function (val) {
              return val;
            }
          }
        },

      }


    },

    series() {

      let list = [];

      const dataAndAccounts = this.data.periods_and_accounts;

      this.months.forEach(month => {

        if (dataAndAccounts[month]) {

          const item = dataAndAccounts[month];

          const itemKeys = Object.keys(item);

          if (itemKeys) {
            itemKeys.forEach(itemKey => {


                list.push({
                  x: itemKey,
                  y: item[itemKey]
                });




            })


          }


        }


      })


      return [{
        name: "Expense trends",
        data: list
      }];


    }
  }
})
</script>

<style scoped>

</style>