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

      months: ["January",
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
      ]
    }
  },

  methods: {
    monthTest(items) {
      let sumkeys = 0;

      this.months.forEach(month => {

        const test = items[month];

        if (test) {
          sumkeys += Object.keys(test).length;
        }

      });


      return sumkeys>0;
    }
  },
  computed: {
    chartOptions() {

      if (!this.data.periods_and_accounts) {

        return {};

      }

      let groupList = [];
      const dataAndAccounts = this.data.periods_and_accounts;

      const monthTest = this.monthTest(dataAndAccounts);
      console.log(monthTest)

      const mainKeys = monthTest ? this.months : Object.keys(dataAndAccounts);

      mainKeys.forEach(month => {


        const dataKeys = dataAndAccounts[month] ? Object.keys(dataAndAccounts[month]) : null;

        if (dataKeys) {
          let cols = dataKeys.length;

          groupList.push({
            title: monthTest ? month.substring(0, 3) : month,
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
            columnWidth: '30%',
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
              fontSize: "12px"
            },
            enabled: false,
            formatter: function (val) {
              return val.substring(0, 20) + "...";
            }
          },
          group: {
            style: {
              fontSize: '16px',
              fontWeight: 800,
            },
            groups: groupList
          }
        },
        title: {
          text: this.title+' trends',
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

      const monthTest = this.monthTest(dataAndAccounts);


      const mainKeys = monthTest ? this.months : Object.keys(dataAndAccounts);

      mainKeys.forEach(month => {

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