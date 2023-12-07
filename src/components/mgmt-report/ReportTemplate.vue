<template>

  <span>

    <document-loading-component v-if="loading"></document-loading-component>

  <span v-else>
    <div class="mx-auto grey lighten-4" v-if="report">
      <v-toolbar-title
          class="text-center fw-bold text-uppercase nanum"
          style="font-size: 2rem"
      >{{ report.name.split(":")[0] }}
      </v-toolbar-title>
      <!--	  DOCUMENT DISPLAY-->
      <v-container
          class="relative overflow-y-auto  pa-2"
          style="height: 80vh"
          v-if="report"

      >
        <!--      COVER PAGE-->
        <main class="rounded mx-auto" id="main" :style="`background-image: url(${backgroundImage(report.color)});`">
          <img
              src="../../../public/img/projections.svg"
              alt=""
              height="200px"
              style="position: absolute; bottom: 0; left: 0"
          />
          <section>
            <img
                alt="company_logo"
                :src="report.business_logo"
                class="rounded-pill pa-2 ml-10"
                height="100"
            />
            <h1
                class="text-uppercase font-weight-bold nanum white pa-1"
                style="font-size: 2rem"
            >
              Management Report
            </h1>
            <h3 class="my-2">
              <strong class="white pa-1 nanum" style="font-size: 1.5rem">{{
                  report.business_name
                }}</strong><br/>

            </h3>
            <small class="nanum white pa-1 font-italic" style="font-size: 1.3rem">{{
                report.name.split(":")[1]
              }}</small>
          </section>
        </main>
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
                    class="font-weight-bold black--text nanum mt-6"
                    id="one"
                    :style=" {
										  'border': 'solid 10px ' + reportColorHex(report.color),
										  'padding': '0 1rem',
										  'text-align': 'center',
										  'color': reportColorHex(report.color) + ' !important',
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
            <v-col cols="6" >

               <pie-chart-component
                   :data="page.data"
                   :title="page.main_title"
                   v-if="['general_administrative_expenses'].includes(page.slug)">
               </pie-chart-component>

              <mix-line-chart-component
                  :title="page.main_title"
                  :data="page.data"
                  v-else-if="['gross_net_profit','ratios_recommendations_ratio'].includes(page.slug)"
              ></mix-line-chart-component>

              <barchart-component
                  v-else-if="page.data"
              :data="page.data"
              :title="page.main_title"
              ></barchart-component>



            </v-col>
          </v-row>
        </div>
        <!--	    THANK YOU PAGE-->
        <main class="ma-5 pa-10 rounded mx-auto" :style="`background-image: url(${backgroundImage(report.color)});`">
          <img
              src="/img/thanks.svg"
              alt=""
              height="200px"
              style="position: absolute; bottom: 0; left: 0"
          />
          <section style="top: 50%; left: 60%">
            <img
                alt="company_logo"
                src="/img/done.svg"
                class="rounded-pill"
                height="50"
            />
            <h1 class="text-uppercase font-weight-bold nanum">Thank You</h1>
            <h4>
              Powered By
              <strong class="font-weight-bold">Built Accounting AI</strong>
            </h4>
          </section>
        </main>
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
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Edit Document</v-list-item-title>
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
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h5 class="fw-medium">Choose a template color</h5>
                <div class="overflow-y-auto d-flex align-center text-center" style="height: 150px">
                  <v-sheet v-for="(item, idx) in bgColors" :key="idx" class="mr-2 py-2 sheet"
                           style="cursor: pointer; font-size: 0.4rem"
                           @click="setReportColor(item)" height="50" width="200" rounded
                           :style="
												          `background-image: url(${backgroundImage(item)});`
																">
                    <p class="fw-bold text-center white--text text--lighten-1 text-uppercase" style="font-size: 0.5rem">{{
                        item
                      }}</p>

                  </v-sheet>
                </div>
              </v-col>
              <v-btn color="blue darken-4" class="white--text text-capitalize my-5 mx-auto fw-bold" rounded depressed>Save Changes</v-btn>


            </v-row>


          </v-form>

        </v-col>
      </v-row>

    </v-navigation-drawer>

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
import eventBus, {getAccessToken} from "@/utils";
import DocumentLoadingComponent from "@/components/DocumentLoadingComponent.vue";
import BarchartComponent from "@/components/chart-components/BarchartComponent.vue";
import PieChartComponent from "@/components/chart-components/PieChartComponent.vue";
import MixLineChartComponent from "@/components/chart-components/MixLineChartComponent.vue";

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
    };
  },
  components: {MixLineChartComponent, PieChartComponent, BarchartComponent, DocumentLoadingComponent, "el-tiptap": ElementTiptap},

  methods: {


    getReport() {

      this.loading = true;

      axios.get("/api/management-reports/" + this.uuid)
          .then(res => {

            this.report = res.data;
						document.title = 'CFO AI - ' + this.report.name.split(':')[0];
            this.loading = false;
            this.$store.state.sidebarOpen=false;

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
	    axios.patch(`/api/management-reports/${this.report.uuid}`, {name: this.filename ? this.filename : this.report.name.split(':')[0], color: this.report.color})
      this.settingsDialog = false;
    },
    setReportColor(color) {
      this.report.color = color
	    axios.patch(`/api/management-reports/${this.report.uuid}`, {color: color})
    },
    backgroundImage(image) {
      switch (image) {
        case "green":
          return "/img/reportBgGreen.png";
        case "blue2":
          return "/img/reportBgBlue2.png";
        case "red":
          return "/img/reportBgRed.png";
        case "yellow":
          return "/img/reportBgYellow.png";
        default:
          return "/img/reportBgDefault.png";
      }

    },
	  reportColorHex(color) {
			let result;
			switch (color) {
				case color === 'green':
					result = '#0097B2'
					break;
				case color === 'yellow':
					result = '#FFDE59'
					break;
				case color === 'red':
					result = '#9E283C'
					break;
				default:
					result = '#0D47A1'
					break;
			}
			return result;
	  }
  },
  created() {
    eventBus.$on("open-report", (doc) => {
      console.log(doc + " from report template");
      this.doc = doc;
    });
  },
  mounted() {
	  this.$store.state.sidebarOpen=false

    this.getReport();

    if (this.report) {
      this.filename = this.report.name.split(':')[0]
      this.$store.commit('COMMIT_CHART_TRANSFORMATION', this.$store.state.currentReport)

    }
  },
  computed: {

    uuid() {
      return this.$route.params.id;
    },


    bgColors() {
      return [
        'default',
        // "blue2",
        "green",
        "yellow",
        "red",
      ];
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
