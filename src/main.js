/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from "vue";
import router from "./router";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import "vuetify/dist/vuetify.min.css";

import "@mdi/font/css/materialdesignicons.css";
import moment from "moment";
import VueApexCharts from "vue-apexcharts";
import store from "./store";
import App from "./App.vue";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import {ElementTiptapPlugin} from "element-tiptap";
// import ElementUI's styles
import "element-ui/lib/theme-chalk/index.css";
// import this package's styles
import "element-tiptap/lib/index.css";
import { StripePlugin } from '@vue-stripe/vue-stripe';

// use ElementUI's plugin
Vue.use(ElementUI);
// use this package's plugin
Vue.use(ElementTiptapPlugin, {
    /* plugin options */
});


Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

require("./bootstrap");

Vue.use(Vuetify);
Vue.use(VueRouter);

Vue.prototype.moment = moment;
Vue.config.productionTip = false;
Vuetify.config.silent = true;


new Vue({
    router,
    store,
    moment,
    vuetify: new Vuetify(),
    render: (h) => h(App),
    created() {
        this.$store.commit("INIT_USER");
    }
}).$mount("#app");
