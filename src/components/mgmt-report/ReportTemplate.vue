<template>

  <span>

    <document-loading-component v-if="loading"></document-loading-component>

	  <div v-else-if="regenerating" class="text-center my-auto"
	       style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center">
				<v-progress-circular
					size="250"
					indeterminate
					class="mx-auto"
					width="15"
					color="#0D2E57"
				><v-avatar size="200">
            <v-img
	            class="logo-animation"
	            src="data:image/png;base64,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"
            ></v-img>
          </v-avatar></v-progress-circular>
        <h5 class="text-center">Regenerating report, please wait ...</h5>
		</div>

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
							<!--PRESENT CONTENT-->
             <div v-if="presentMode">
							<!--							EMPTY PAGE CONTENT-->
              <p v-if="page.summary === '' || page.summary === `<p></p>`" @dblclick="editPageContent(page)">
                This section does not have any content yet. Double-click to add
                some.
              </p>
              <p
	              class="mt-4 text-justify"
	              v-else
	              style="font-size: 1.2rem"
	              v-html="page.summary"
	              @dblclick="editPageContent(page)"
              ></p>

             </div>
	            <!--	EDIT CONTENT-->
              <span v-else>
	              <div class="d-flex align-center">
		              <transition name="fade-in">
								    <v-btn :color="report.color" depressed rounded outlined
								           @click="pagesToUpdate.length > 1 ? saveAllPages() : savePage(page)"
								           v-if="pagesToUpdate.find((one) => one.uuid === page.uuid)">
								        Save {{ pagesToUpdate.length > 1 ? 'all' : 'change' }}
								    </v-btn>
									</transition>

		              <transition name="fade-in">
		                <v-switch
			                color="blue darken-4"
			                v-model="presentMode"
			                :label="presentMode ? 'Edit Mode' : 'Switch To Preview'"
			                inset
			                class="mx-2"
		                ></v-switch>
		              </transition>
	              </div>


              <el-tiptap
	              style="font-size: 1.2rem !important;"
	              @onUpdate="updating(page);"
	              class="mt-4"
	              :spellcheck="true"
	              :placeholder="`Section content for ${page.title}`"
	              v-model="page.summary"
	              :extensions="extensions"
              />
              </span>

            </v-col>
	          <!--					CHARTS-->
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

                  <v-btn style="transition: 0.3s ease-in-out" block text color="blue"
                         @click="showTrends=!showTrends">{{ showTrends ? 'Hide' : 'Show' }} trends
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
	          :href="$store.state.baseURL + '/management-reports/' + report.uuid + '/download'"
	          download
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
	        <div class="d-flex align-center">
	        <v-btn text class="text-capitalize grey--text text--darken-2" v-if="presentMode">Edit</v-btn>
          <v-switch
	          v-if="presentMode"
	          color="blue darken-4"
	          v-model="presentMode"
	          :label="presentMode ? 'Preview' : 'Edit'"
	          inset
          ></v-switch>
	        </div>
          <v-spacer/>
        </v-list-item>
      </v-list>

    </div>

    <v-navigation-drawer
	    app
	    right
	    floating
	    class="px-1"
    >
      <template v-slot:prepend>
        <v-list-item dark two-line class="font-weight-bold blue darken-3">
          <v-list-item-content>
            <v-list-item-title>Report Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-row dense class="pa-5" v-if="report">
        <v-col cols="12">

          <v-form @submit.prevent="updateSettings">

            <v-row class="d-flex flex-column justify-center">
              <v-col
	              cols="12"
              >

                <v-text-field
	                :persistent-hint="true"
	                label="Update your file name"
	                v-model="filename"
	                :counter="99"
	                required
	                outlined
	                style="font-size: 0.8rem"
	                class="mb-5"
                ></v-text-field>

                <h5 class="fw-medium">Choose a template color</h5>
								<v-color-picker
									v-model="report.color"
									:show-swatches="true"
									class="mt-3"
									:hide-inputs="true"
								></v-color-picker>
              </v-col>
              <v-btn
	              block
	              :color="report.color"
	              class="white--text text-capitalize my-5 mx-auto fw-bold"
	              rounded
	              depressed
	              :loading="saving"
	              :disabled="regenerating || !presentMode"
	              @click="updateSettings">Save Changes</v-btn>

	            <v-btn
		            block
		            :color="report.color"
		            class="text-capitalize mt-1 mb-5 mx-auto fw-bold"
		            rounded
		            depressed
		            outlined
		            :loading="regenerating"
		            :disabled="saving"
		            @click="reloadReport">Regenerate report</v-btn>

	            <v-btn
		            block
		            color="red darken-4"
		            class="white--text text-capitalize mt-1 mx-auto fw-bold"
		            rounded
		            depressed
		            outlined
		            @click="openDeleteDialog = true">Delete report</v-btn>


            </v-row>


          </v-form>

        </v-col>
      </v-row>

    </v-navigation-drawer>

	  <v-snackbar v-model="showSnackbar" :timeout="5000" color="green">{{ snackbarText }}</v-snackbar>

  </span>

	  <v-dialog v-model="openDeleteDialog" width="500" scrollable>
		  <v-card>
			  <v-card-title>Are you sure?</v-card-title>
			  <v-card-text>
				  <p>Do you want to delete <strong>{{ report.name }}</strong>? This action cannot be reversed.</p>
			  </v-card-text>
			  <v-card-actions>
				  <v-spacer></v-spacer>
          <v-btn class="white--text text-capitalize mt-1 mx-auto fw-bold" color="blue darken-1" text
                 @click="openDeleteDialog = false">Cancel</v-btn>
          <v-btn class="white--text text-capitalize mt-1 mx-auto fw-bold" color="red darken-4" text
                 @click="deleteReport">Delete</v-btn>
			  </v-card-actions>
		  </v-card>
	  </v-dialog>

	  <!--	  <v-dialog v-model="openConfirmRegenerate" width="500" scrollable>-->
	  <!--		  <v-card>-->
	  <!--			  <v-card-title>Confirm</v-card-title>-->
	  <!--			  <v-card-text>-->
	  <!--				  <p>This will cost you <strong>{{report.name}}</strong>? This action cannot be reversed.</p>-->
	  <!--			  </v-card-text>-->
	  <!--			  <v-card-actions>-->
	  <!--				  <v-spacer></v-spacer>-->
	  <!--          <v-btn class="white&#45;&#45;text text-capitalize mt-1 mx-auto fw-bold" color="blue darken-1" text @click="openConfirmRegenerate = false">Cancel</v-btn>-->
	  <!--          <v-btn class="white&#45;&#45;text text-capitalize mt-1 mx-auto fw-bold" color="red darken-4" text @click="deleteReport">Delete</v-btn>-->
	  <!--			  </v-card-actions>-->
	  <!--		  </v-card>-->
	  <!--	  </v-dialog>-->


  </span>

</template>

<script>
import {
	Blockquote,
	Bold,
	BulletList,
	Doc,
	ElementTiptap,
	FontSize,
	FormatClear,
	Heading,
	History,
	Italic,
	ListItem,
	OrderedList,
	Paragraph,
	Preview,
	Text,
	TextAlign,
	TextColor,
	Underline
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
			showTrends: false,
			report: null,
			loading: false,
			presentMode: true,
			saving: false,
			extensions: [
				new Doc(),
				new Text(),
				new Paragraph(),
				new Heading({level: 5}),
				new Bold({bubble: true}), // render command-button in bubble menu.
				new Underline({bubble: true}), // render command-button in bubble menu but not in menubar.
				new Italic({bubble: true}),
				new ListItem(),
				new BulletList(),
				new OrderedList(),
				new TextColor({bubble: true}),
				new FormatClear(),
				new History(),
				new FontSize(),
				new Blockquote(),
				new Preview(),
				new TextAlign({bubble: true}),
			],
			content: "",
			doc: null,
			settingsDialog: false,
			filename: '',
			currentColor: '',
			showSnackbar: false,
			snackbarText: '',
			pageSummary: '',
			pageToUpdate: null,
			unsavedPages: [],
			pagesToUpdate: [],
			regenerating: false,
			editorContent: '',
			openDeleteDialog: false
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
		editPageContent(page) {
			this.presentMode = false;
			this.pageToUpdate = page
			// this.editorContent = page.summary
		},
		onEditorUpdate(update) {
		},
		updateSettings() {

			this.saving = true;

			axios.patch(`/api/management-reports/${this.report.uuid}`, {
				name: this.filename ? this.filename : this.report.name.split(':')[0],
				color: this.report.color
			})
				.then(res => {
					eventBus.$emit('update-report-settings', this.report);
					this.currentColor = this.report.color
					this.settingsDialog = false;
					this.showSnackbar = true
					this.snackbarText = 'Report updated'
					this.getReport()
					this.saving = false;

				})
		},

		updating(page) {
			let pageExists = this.pagesToUpdate.find(p => p.uuid === page.uuid);
			if (!pageExists) {
				this.pageToUpdate = page;
				// this.pagesToUpdate.push({page, 'newContent': this.editorContent})
				this.pagesToUpdate.push(page)
			} else {
				pageExists.summary = page.summary;
			}
		},
		savePage(page) {
			axios.patch(`/api/management-reports/${this.report.uuid}/pages/${page.uuid}`, {
				"content": page.summary
			}).then((res) => {
				this.pagesToUpdate = []
				this.pageToUpdate = null
			}).catch((err) => {
				this.loading = false
				console.log(`${page.name} failed to update!`)
				console.log(err)
			})

		},
		saveAllPages() {
			this.pagesToUpdate.forEach(page => {
				this.savePage(page)
			})
			this.pagesToUpdate = []
			this.presentMode = true;
		},
		reloadReport() {
			this.regenerating = true;
			axios.post("/api/management-reports/" + this.report.uuid + '/reload')
				.then(res => {
					this.report = res.data.data;
					document.title = 'CFO AI -' + this.report.name.split(':')[0];
					this.regenerating = false;

				})
		},
		deleteReport() {
			this.loading = true;
			axios.delete('/api/management-reports/' + this.report.uuid).then(() => {
				this.$store.dispatch('getReports')
				this.openDeleteDialog = false;
				this.$router.push('/');
				this.$store.state.sidebarOpen = true
				eventBus.$emit('delete-report',);
				this.loading = false
			})
		},
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

.fade-in-enter-active, .fade-in-leave-active {
	transition: opacity 300ms ease-in-out;
}

.fade-in-enter, .fade-in-leave-to {
	opacity: 0;
}

</style>
