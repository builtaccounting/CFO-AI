<template>
	<v-col cols="12"
	       class="ma-0 pa-0"
	       v-html="imgSRC"
	       style="width: 100% !important;
	       position: relative;
	       min-height: 60vh !important">
	</v-col>

</template>
<script>
export default {

	props: {
		report: {
			type: Object
		},
		color: {
			type: String,
			default: "yellow"
		},
		page:{
			type: String,
			required: true
		}
	},
	name: "ReportBackground",
	data() {
		return {

		}
	},
	computed: {
		imgSRC() {
			return `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" viewBox="0 0 5184 3456" enable-background="new 0 0 5184 3456" xml:space="preserve">
			${this.path}\td="M4.000000,3420.000000
			\tC4.000000,2281.556396 4.000000,1143.112671 4.000000,4.334531
			\tC1732.000000,4.334531 3460.000000,4.334531 5188.000000,4.334531
			\tC5188.000000,24.312151 5188.000000,44.309097 5186.742188,66.661469
			\tC5180.020996,72.811867 5174.659180,76.763443 5169.079102,80.378601
			\tC5083.059082,136.108124 4997.014160,191.798752 4910.966797,247.486618
			\tC4881.416016,266.610901 4851.882812,285.762207 4822.253418,304.763672
			\tC4815.573242,309.047729 4808.309570,312.428711 4801.683105,316.786530
			\tC4770.091309,337.563568 4738.823242,358.837555 4707.086914,379.389679
			\tC4342.546387,615.462830 3977.963135,851.470215 3613.322021,1087.388306
			\tC3574.774658,1112.327881 3535.622314,1136.332397 3497.055420,1161.242432
			\tC3464.174805,1182.479248 3431.924316,1204.690918 3399.067383,1225.965088
			\tC3035.067871,1461.646729 2671.034424,1697.276123 2306.928711,1932.793945
			\tC2246.657227,1971.779907 2185.880615,2009.985474 2125.559326,2048.895508
			\tC2093.787598,2069.389404 2062.691162,2090.929688 2030.955444,2111.480957
			\tC1666.413208,2347.551514 1301.828369,2583.556396 937.186157,2819.472412
			\tC898.735291,2844.349365 859.676453,2868.286133 821.210144,2893.139160
			\tC786.654846,2915.465332 752.704163,2938.726074 718.180542,2961.102051
			\tC542.617126,3074.889404 366.953888,3188.522705 191.326294,3302.211182
			\tC135.394653,3338.417480 79.496216,3374.675537 23.489799,3410.765869
			\tC17.458906,3414.652100 12.071564,3420.270508 4.000000,3420.000000
			z"/>
			<path fill="#FFFFFF" opacity="1.000000" stroke="none"
			\td="
			M4.000000,3421.946289
			\tC12.071564,3420.270508 17.458906,3414.652100 23.489799,3410.765869
			\tC79.496216,3374.675537 135.394653,3338.417480 191.326294,3302.211182
			\tC366.953888,3188.522705 542.617126,3074.889404 718.180542,2961.102051
			\tC752.704163,2938.726074 786.654846,2915.465332 821.210144,2893.139160
			\tC859.676453,2868.286133 898.735291,2844.349365 937.186157,2819.472412
			\tC1301.828369,2583.556396 1666.413208,2347.551514 2030.955444,2111.480957
			\tC2062.691162,2090.929688 2093.787598,2069.389404 2125.559326,2048.895508
			\tC2185.880615,2009.985474 2246.657227,1971.779907 2306.928711,1932.793945
			\tC2671.034424,1697.276123 3035.067871,1461.646729 3399.067383,1225.965088
			\tC3431.924316,1204.690918 3464.174805,1182.479248 3497.055420,1161.242432
			\tC3535.622314,1136.332397 3574.774658,1112.327881 3613.322021,1087.388306
			\tC3977.963135,851.470215 4342.546387,615.462830 4707.086914,379.389679
			\tC4738.823242,358.837555 4770.091309,337.563568 4801.683105,316.786530
			\tC4808.309570,312.428711 4815.573242,309.047729 4822.253418,304.763672
			\tC4851.882812,285.762207 4881.416016,266.610901 4910.966797,247.486618
			\tC4997.014160,191.798752 5083.059082,136.108124 5169.079102,80.378601
			\tC5174.659180,76.763443 5180.020996,72.811867 5186.742188,68.508446
			\tC5188.000000,1198.418335 5188.000000,2328.836670 5188.000000,3459.627441
			\tC3460.000000,3459.627441 1732.000000,3459.627441 4.000000,3459.627441
			\tC4.000000,3447.886475 4.000000,3435.889648 4.000000,3421.946289
			z"/>
			</svg>
			${this.content}
`
		},
		path() {
			return "<path fill=" + this.color + " opacity='1.000000' stroke='none'"
		},
		content() {
			return this.page === 'cover' ? `
			<img
			src="/img/projections.svg"
			alt=""
			height="200px"
			style="position: absolute; bottom: 1%; left: 1%;"
			/>
			<section>
			<img
			alt="company_logo"
			src="${this.report.business_logo}"
			class="rounded-pill pa-2 ml-10"
			height="100"
			/>
			<h1
			class="text-uppercase font-weight-bold white pa-1 handwritten"
			style="font-size: 2rem"
			>
			Management Report
			</h1>
			<h3 class="my-2">
			<strong class="white pa-1 handwritten" style="font-size: 1.5rem">${this.report.business_name}</strong><br/>
			</h3>
			<small class="handwritten white pa-1 font-italic" style="font-size: 1.3rem">${this.report.name.split(":")[1]}
			</small>
			</section>`
				:
			`<img
			src="/img/thanks.svg"
			alt=""
			height="200px"
			style="position: absolute; bottom: 0; left: 0"/>
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
        </section>`
		}
	},
	mounted() {
		console.log(this.imgSRC);
	}
}
</script>


<style>
.handwritten {
	font-family: "Nanum Pen Script", "sans-serif" !important;
}
section {
	position: absolute !important;
	top: 50%;
	left: 50%;
	transform: translate(50%, -50%);
}

section::before {
	content: "";
	border-radius: 50%;
	background-color: rgba(70, 127, 207, 0.05);
	padding: 12rem;
	position: absolute;
	top: -20%;
	right: -20%;
	z-index: -999;
}

</style>