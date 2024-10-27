import Vue from "vue";
import VueI18n from "vue-i18n";
import zh from "./langs/zh"
import en from "./langs/en"
 
Vue.use(VueI18n); // 全局挂载
 
export const i18n = new VueI18n({
  locale: localStorage.getItem("locale") || "zh", // 从localStorage中获取 默认英文
  messages: {
    zh,
    en
  }
});
 
export default i18n;