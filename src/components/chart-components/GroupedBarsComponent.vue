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


  methods: {
    hasItems(keys) {
      return keys.find(key => key == '\'\x00*\x00items');
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

          console.log(dataKeys);


          if (this.hasItems(dataKeys)) {
            const innerkeys = Object.keys(dataAndAccounts[month]['*items']);

            cols += (innerkeys.length - 1)


          }

          groupList.push({
            title: month,
            cols: cols
          });

        }

      })


      console.log(groupList);

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
            enabled: false,
            formatter: function (val) {
              return val;
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

              const itemvalue = item[itemKey];

              if (typeof itemvalue === 'number') {

                list.push({
                  x: itemKey.substring(0, 18)+"...",
                  y: item[itemKey]
                });

              } else if (itemvalue.length > 0) {

                const valueKeys = Object.keys(itemvalue);

                if (valueKeys) {
                  valueKeys.forEach(key => {
                    list.push({
                      x: "item",
                      y: itemvalue[itemKey]
                    });


                  })


                }


              }


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