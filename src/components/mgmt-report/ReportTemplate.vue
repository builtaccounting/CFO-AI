<template>

  <span>

    <document-loading-component v-if="loading"></document-loading-component>

  <span v-else>
    <div class="mx-auto grey lighten-4" v-if="report">
      <v-toolbar-title
          class="text-center fw-bold text-uppercase nanum"
          style="font-size: 2rem"
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

             <span v-if="presentMode">
              <p v-if="page.summary === ''" @dblclick="editPageContent">
                This section does not have any content yet. Double-click to add
                some.
              </p>
              <p
                  class="mt-4 text-h6 text-justify"
                  v-else
                  v-html="formattedResponse(page.summary)"
                  @dblclick="editPageContent"
              ></p>

             </span>

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
        absolute
        right
        v-if="!$store.state.sidebarOpen"
        color="grey lighten-4"
    >
      <template v-slot:prepend>
        <v-list-item two-line :style="{'color': 'white', 'background-color': report.color}" class="fw-bold">
          <v-list-item-content>
            <v-list-item-title >Edit Document</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-row class="pa-5">
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
                    label="File name"
                    required
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
                  @click="updateSettings">Save Changes</v-btn>


            </v-row>


          </v-form>

        </v-col>
      </v-row>

    </v-navigation-drawer>

	  <v-snackbar v-model="showSnackbar" :timeout="5000" color="green">{{snackbarText}}</v-snackbar>

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

export default {
  name: "ReportTemplate",
  data() {
    return {
      report: null,
      loading: false,
      presentMode: true,
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
            this.$store.state.sidebarOpen = false;

          })


    },

    onBlur() {
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
    openFileSettings() {
      this.settingsDialog = true;
    },
    updateSettings() {
      axios.patch(`/api/management-reports/${this.report.uuid}`, {
        name: this.filename ? this.filename : this.report.name.split(':')[0],
        color: this.report.color
      })
	    eventBus.$emit('update-report-settings', this.report);
      this.currentColor = this.report.color
      this.settingsDialog = false;
			this.showSnackbar = true
	    this.snackbarText = 'Report settings updated'
    },
    setReportColor(color) {
      this.report.color = color
      this.currentColor = this.reportColorHex(this.report.color);
      axios.patch(`/api/management-reports/${this.report.uuid}`, {color: color})
    },
    backgroundImage(image) {
      switch (image) {
        case "green":
          return "/img/reportBgGreen.png";
        case "red":
          return "/img/reportBgRed.png";
        case "yellow":
          return "/img/reportBgYellow.png";
        case "blue":
          return "/img/reportBgDefault.svg";
        default:
          return "/img/reportBgDefault.svg";
      }

    },
    reportColorHex(color) {
      switch (color) {
        case  'green':
          this.currentColor = '#0097B2'
          return '#0097B2'
        case  'yellow':
          this.currentColor = '#FFDE59'
          return '#FFDE59'
        case 'red':
          this.currentColor = '#9E283C'
          return '#9E283C'
        case 'blue':
          this.currentColor = '#0D47A1'
          return '#0D47A1'
        default:
          this.currentColor = '#0D47A1'
          return '#0D47A1'
      }
    },
    changeColor() {
      console.log(this.currentColor)

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


    bgColors() {
      return [
        'blue',
        // "blue2",
        "green",
        "yellow",
        "red",
      ];
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
      // console.log(newReport);
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
