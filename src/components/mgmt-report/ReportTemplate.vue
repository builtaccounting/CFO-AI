<template>

  <span>

    <document-loading-component v-if="loading"></document-loading-component>

  <span v-else>
    <div class="mx-auto grey lighten-4" v-if="report">
      <v-toolbar-title
          class="text-center fw-bold text-capitalize"
          style="font-size: 1.5rem"
      >{{ reportName }}
      </v-toolbar-title>
      <!--	  DOCUMENT DISPLAY-->
      <v-container
          class="relative overflow-y-auto  pa-2"
          style="height: 80vh"
          v-if="report"

      >
        <!--      COVER PAGE-->
	      <report-background
            :report="report"
            class="w-100"
            :color="report.color"
            page="cover"
        ></report-background>

        <!--	    OTHER PAGES-->
        <div
            v-for="(page, idx) in report.pages"
            :key="idx"
            class="rounded mx-auto white"
            style=""
        >
          <v-row
              class="ma-5  rounded mx-10"
              style="min-height: 60vh !important"
          >
            <v-col cols="12">
                <h2
                    style="border-radius: 255px 15px 225px 15px/15px 225px 15px 255px"
                    class="font-weight-bold black--text mt-6"
                    id="one"
                    :style=" {
										  'border': 'solid 10px ' + report.color,
										  'padding': '0 1rem',
										  'text-align': 'center',
										  'color': report.color + ' !important',
										}"
                >
                {{ page.main_title }}: {{ page.title }}
              </h2>
            </v-col>
            <v-col
                :cols="['ratios_recommendations_recommendations'].includes(page.slug) ? 12 :6"
            >

             <div v-if="presentMode">
              <p v-if="page.summary === ''" @dblclick="editPageContent">
                This section does not have any content yet. Double-click to add
                some.
              </p>
              <p
                  class="mt-4 text-h6 text-justify"
                  v-else
                  v-html="page.summary"
                  @dblclick="editPageContent"
              ></p>

             </div>

              <span v-else>


              <el-tiptap
                  class="mt-4"
                  :spellcheck="true"
                  :placeholder="`Section content for ${page.title}`"
                  v-model="page.summary"
                  :extensions="extensions"
                  @onUpdate="onEditorUpdate"
              />
              </span>

            </v-col>
            <!--					CHART-->
            <v-col cols="6">

               <pie-chart-component
                   :color="report.color"
                   :data="page.data"
                   :title="page.main_title"
                   v-if="['general_administrative_expenses'].includes(page.slug)">
               </pie-chart-component>

              <mix-line-chart-component
                  :color="report.color"
                  :title="page.main_title"
                  :data="page.data"
                  v-else-if="['gross_net_profit','ratios_recommendations_ratio'].includes(page.slug)"
              ></mix-line-chart-component>

              <barchart-component
                  :color="report.color"
                  v-else-if="page.data"
                  :data="page.data"
                  :title="page.main_title"
              ></barchart-component>
            </v-col>

            <v-col
                cols="12"
                v-if="['general_administrative_expenses'].includes(page.slug)"
            >
              <grouped-bars-component
                  v-if="report"
                  :data="page.data"
                  :title="page.main_title"
                  :color="report.color"
              ></grouped-bars-component>
            </v-col>

                <v-col
                cols="12"
                v-else-if="['revenue','cost_of_sale','receivables','payables','cash_bank'].includes(page.slug)"
            >

                  <v-btn style="transition: 0.3s ease-in-out" block text color="blue" @click="showTrends=!showTrends">{{showTrends ? 'Hide' : 'Show'}} trends
                    <v-icon style="transition: 0.3s ease-in-out" v-if="!showTrends">mdi-chevron-down</v-icon>
                    <v-icon style="transition: 0.3s ease-in-out" v-else>mdi-chevron-up</v-icon>
                  </v-btn>
                  <span v-if="showTrends" style="transition: 0.3s ease-in-out">

              <grouped-bars-component
                  v-if="report"
                  :data="page.data"
                  :title="page.title"
                  :color="report.color"
              ></grouped-bars-component>
                  </span>

            </v-col>




          </v-row>
        </div>

        <!--	    THANK YOU PAGE-->
        <report-background
            page="end"
            :color="report.color"
            class="w-100"
            :report="report"
        ></report-background>
      </v-container>


      <v-list color="grey lighten-4">
        <v-list-item>
          <v-spacer/>
          <v-btn
              class="text-capitalize fw-bold"
              small
              outlined
              depressed
              rounded
              color="blue darken-4"
          >
            <v-icon small>mdi-share</v-icon>
            Share
          </v-btn>

          <v-btn
              class="text-capitalize fw-bold mx-1"
              small
              outlined
              depressed
              rounded
              color="blue darken-4"
          >
            <v-icon small>mdi-download</v-icon>
            Download
          </v-btn>

          <v-btn
              class="text-capitalize fw-bold"
              small
              outlined
              depressed
              rounded
              color="blue darken-4"
          >
            <v-icon small>mdi-comment-quote-outline</v-icon>
            Share Feedback
          </v-btn>
          <v-spacer/>
          <v-switch
              color="blue darken-4"
              v-model="presentMode"
              :label="presentMode ? 'Presentation Mode' : 'Edit Mode'"
              inset
          ></v-switch>
          <v-spacer/>
        </v-list-item>
      </v-list>

    </div>

    <v-navigation-drawer
        app
        right
        floating
    >
      <template v-slot:prepend>
        <v-list-item dark  two-line class="font-weight-bold blue darken-3">
          <v-list-item-content>
            <v-list-item-title>Report Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-row dense class="pa-5">
        <v-col cols="12">

          <v-form @submit.prevent="updateSettings">

            <v-row class="d-flex flex-column justify-center">
              <v-col
                  cols="12"
              >

                <v-text-field
                    :persistent-hint="true"
                    hint="Update your file name"
                    v-if="report"
                    v-model="filename"
                    :counter="99"

                    required
                    outlined
                    style="font-size: 0.8rem"
                    class="mb-5"
                ></v-text-field>

                <h5 class="fw-medium">Choose a template color</h5>
								<v-color-picker
                    v-if="report"
                    v-model="report.color"
                    :show-swatches="true"
                    class="mt-3"
                    :hide-inputs="true"
                ></v-color-picker>
              </v-col>
              <v-btn
                  v-if="report"
                  :color="report.color"
                  class="white--text text-capitalize my-5 mx-auto fw-bold"
                  rounded
                  depressed
                  x-large
                  :loading="saving"
                  @click="updateSettings">Save Changes</v-btn>


            </v-row>


          </v-form>

        </v-col>
      </v-row>

    </v-navigation-drawer>

	  <v-snackbar v-model="showSnackbar" :timeout="5000" color="green">{{ snackbarText }}</v-snackbar>

  </span>


  </span>

</template>

<script>
import {marked} from "marked";
import {
  Bold,
  BulletList,
  Doc,
  ElementTiptap,
  FormatClear,
  Heading,
  Italic,
  ListItem,
  OrderedList,
  Paragraph,
  Strike,
  Text,
  TextColor,
  Underline,
} from "element-tiptap";
import DocumentLoadingComponent from "@/components/DocumentLoadingComponent.vue";
import BarchartComponent from "@/components/chart-components/BarchartComponent.vue";
import PieChartComponent from "@/components/chart-components/PieChartComponent.vue";
import MixLineChartComponent from "@/components/chart-components/MixLineChartComponent.vue";
import ReportBackground from "@/components/ReportBackground.vue";
import eventBus from "@/utils";
import GroupedBarsComponent from "@/components/chart-components/GroupedBarsComponent.vue";

export default {
  name: "ReportTemplate",
  data() {
    return {
      showTrends:false,
      report: null,
      loading: false,
      presentMode: true,
      saving:false,
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({level: 5}),
        new Bold({bubble: true}), // render command-button in bubble menu.
        new Underline({bubble: true, menubar: false}), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TextColor(),
        new FormatClear(),
      ],
      content: "",
      doc: null,
      settingsDialog: false,
      filename: '',
      currentColor: '',
      showSnackbar: false,
      snackbarText: ''
    };
  },
  components: {
    GroupedBarsComponent,
    ReportBackground,
    MixLineChartComponent,
    PieChartComponent,
    BarchartComponent,
    DocumentLoadingComponent,
    "el-tiptap": ElementTiptap
  },

  methods: {


    getReport() {

      this.loading = true;

      axios.get("/api/management-reports/" + this.uuid)
          .then(res => {

            this.report = res.data;
            document.title = 'CFO AI - ' + this.report.name.split(':')[0];
            this.loading = false;
            // this.$store.state.sidebarOpen = false;

          })


    },
    editPageContent() {
      this.presentMode = false;
    },
    formattedResponse(res) {
      return marked(res);
    },
    onEditorUpdate() {
      console.log(this.report.pages);
    },
    updateSettings() {

      this.saving=true;

      axios.patch(`/api/management-reports/${this.report.uuid}`, {
        name: this.filename ? this.filename : this.report.name.split(':')[0],
        color: this.report.color
      })
          .then(res=> {
            eventBus.$emit('update-report-settings', this.report);
            this.currentColor = this.report.color
            this.settingsDialog = false;
            this.showSnackbar = true
            this.snackbarText = 'Report updated'
            this.saving=false;

          })
    }

  },
  mounted() {
    this.$store.state.sidebarOpen = false

    this.getReport();

    if (this.report) {
      this.filename = this.report.name.split(':')[0]
    }
  },
  computed: {

    uuid() {
      return this.$route.params.id;
    },


    reportName() {
      return this.report.name
    }
  },
  watch: {

    uuid() {
      this.getReport();
    },

    report(newReport) {
      this.filename = newReport.name.split(':')[0]
    },

  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");

.nanum {
  font-family: "Nanum Pen Script", "sans-serif" !important;
  text-transform: uppercase;
  letter-spacing: 2px;
}

main {
//background-image: url("/public/img/reportBgRed.png"); background-repeat: no-repeat; background-position: center center; min-height: 60vh !important; position: relative;
}

section {
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(50%, -50%);
}

section::before {
  content: "";
  border-radius: 50%;
  background-color: rgba(70, 127, 207, 0.05);
  padding: 12rem;
  position: absolute;
  right: 0;
  top: -50%;
  right: -10%;
  z-index: -999;
}

#one {
  border: solid 10px #0d47a1;
  padding: 0 1rem;
  text-align: center;
  color: #0d47a1 !important;
}

p {
  cursor: pointer !important;
}
</style>
