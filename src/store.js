import Vue from "vue";
import Vuex from "vuex";
import {getAccessToken} from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        reports: [],
        user: null,
        initializing: false,
        isLoggedIn: false,
        currentReport: null,
        sidebarOpen: true,
        showGeneralMessage: false,
        generalMessage: '',
        baseURL: "https://web.builtaccounting.com",
    },
    getters: {
        getExistingFile: (state) => (name) => {
            return state.reports.find((one) => {
                return one.fileName === name;
            });
        },
        getUniqueCategories(state) {
            const categories = state.reports.map((item) => item.category);
            return [...new Set(categories)].sort();
        },
        getRecentDocuments(state) {
            return state.reports.reverse().slice(0, 6);
        },
    },
    mutations: {

        INIT_USER(state) {
            state.initializing = true;

            axios.get("/api/user")
                .then(res => {

                    state.user = res.data;

                    state.initializing = false;

                })
                .catch(() => {
                    state.initializing = false;

                })


        },

        TOGGLE_LOGIN(state, payload) {
            state.isLoggedIn = payload
        },
        TOGGLE_SIDEBAR(state, payload) {
            state.sidebarOpen = payload
        },
        SET_USER(state, payload) {
            state.user = payload;
        },
        SET_REPORTS(state, payload) {
            state.reports = payload;
        },
        SET_CURRENT_REPORT(state, payload) {
            state.currentReport = payload;
        }

    },
    actions: {
        generateReport({commit}, payload) {
            let url = "/api/management-reports";
            let token = getAccessToken();
            axios
                .post(url, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((resp) => {
                    console.log(resp);
                });
        },
        async getReports({commit, state}) {
            let api = "/api/management-reports";
            let token = getAccessToken();
            let resp = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            // console.log(resp.data.data);
            commit("SET_REPORTS", resp.data.data);
        },
        initializeUser({commit, dispatch}) {
            return dispatch('getReports')
                .catch(error => {
                    // Handle errors appropriately, e.g., show a notification
                    console.error('Error initializing user:', error)
                })
        },
    },
});
