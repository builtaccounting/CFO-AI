import Cookies from "js-cookie";
// eventBus.js
import Vue from "vue";
import store from "@/store";
import router from "@/router";

const eventBus = new Vue();
export default eventBus;

export const getAccessToken = () => {
  return Cookies.get("access_token");
};
export const setAccessToken = (token) => {
  Cookies.set("access_token", token, { expires: 7 });
};
export const removeToken = () => {
  //clear cookies
  Cookies.remove("access_token");
};
export const setUser = (user) => {
  return localStorage.setItem("user", JSON.stringify(user));
};
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const removeUser = () => {
  //clear cookies
  localStorage.removeItem("user");
};

export const initUser = async () => {
  let user = getUser();
  let token = getAccessToken();
  if(user && token) {
    store.commit("SET_USER", user);
    await store.dispatch('getReports')
    store.commit("TOGGLE_LOGIN", true);
    router.push('/').then(() => {})
    return true;
  }
}
