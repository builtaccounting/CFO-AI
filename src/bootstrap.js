import axios from "axios";
import {getAccessToken} from "@/utils";

window.axios = axios;

window.axios.defaults.baseURL = "https://web.builtaccounting.com";

// window.axios.defaults.baseURL = "https://fxweb.builtaccounting.com";

window.axios.defaults.headers.common = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + getAccessToken()
};

window.axios.defaults.headers.get["Accept"] = "application/json";
window.axios.defaults.headers.post["Accept"] = "application/json";
window.axios.defaults.headers.post["Content-Type"] = "application/json";
window.axios.defaults.headers.post["Content-Type"] = "multipart/form-data";


axios.interceptors.response.use(
    function (response) {


        if (window.location.pathname === "/login") {

            window.location = "/";

        }

        return response;

    },
    function (error) {


        if (error.response.status === 401) {

            if (window.location.pathname !== "/login") {

                window.location = "/login";


            }

        }


     return  Promise.reject(error);

    }
);
