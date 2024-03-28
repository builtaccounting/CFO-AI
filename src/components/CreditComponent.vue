<template>
  <span>

  <v-card class="mt-3" flat color="blue darken-4">
    <v-card-text class="white--text text-center pt-6 pb-6">
      <h1 class="text-h4 font-weight-light mb-0">
        200
      </h1>
      <small>Current credit balance</small>
      <v-btn
          class="mt-5"
          block
          dark
          color="green"
          depressed
          x-large
          rounded
          @click="showBuyDialog=true"
      >Buy Credits
      </v-btn
      >
    </v-card-text>
  </v-card>

    <v-dialog
        :persistent="progress"
        width="500"
        v-model="showBuyDialog"
    >
      <v-card>
        <v-card-title>Purchase report credit</v-card-title>
        <v-card-text>

          <v-text-field v-model="numberOfReports" outlined label="Number of reports"></v-text-field>

          <p class="text-h5 font-weight-light black--text" v-if="numberOfReports">{{ numberOfReports }} reports will cost <strong
              class="font-weight-black"> ${{ amountDue }}</strong> </p>

          <p>Select from preset choices</p>
          <v-row>
            <v-col
                cols="12"
                sm="4"
                v-for="(item,index) in reportNumberOptions"
                :key="index"
            >
              <v-card title="Click to select" outlined
                      @click="amount=item.amount; numberOfReports = item.documentCount">
                <v-card-text>
                  <div class="pa-2 blue lighten-5" style="width: 50px; height: 50px; border-radius: 50%">
                  <v-icon x-large color="blue">mdi-file-outline</v-icon>
                  </div>

                  <strong class="d-block text-h5 font-weight-black black--text">${{ item.amount }}</strong>
                  <small>{{ item.documentCount }} reports</small>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

        </v-card-text>
        <v-card-actions v-if="numberOfReports">
          <v-btn :loading="progress" @click="makeStripeCheckout" block color="green" x-large rounded depressed dark>Buy Now!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="error" color="error">{{ error_message }}</v-snackbar>
  </span>

</template>

<script>


import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "CreditComponent",
  data() {
    return {
      error: false,
      error_message: "",
      showBuyDialog: false,
      amount: 0,
      numberOfReports: 0,
      cost_per_document: 0.5,
      progress: false,
      reportNumberOptions: [
        {
          documentCount: 5,
          amount: 2.5
        },
        {
          documentCount: 10,
          amount: 5
        },
        {
          documentCount: 15,
          amount: 7.5
        },
        {
          documentCount: 20,
          amount: 10
        },
        {
          documentCount: 25,
          amount: 12.5
        },
        {
          documentCount: 30,
          amount: 15
        }

      ]
    }
  },
  methods: {
    makeStripeCheckout() {
      this.progress = true;

      const data = {
        amount: this.amountDue,
        record_type: "cfoai_credit",
        transaction_id: this.$store.state.user.id,
      };

      axios.post("/api/stripe/init-checkout", data)
          .then(res => {
            window.open(res.data.url);
            this.progress = false;
          })
          .catch(() => {
            this.progress = false;
            this.error_message = "Something went wrong, could not initiate checkout";
            this.error = true;

          })

    }
  },
  computed: {

    amountDue() {
      return this.numberOfReports * this.cost_per_document;
    }
  }
})
</script>

<style scoped>

</style>