import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
const app = createApp(App);
import "@/style/demo.less";

const modules = import.meta.globEager("../**/index.js");
Object.values(modules).forEach((module) => {
  const component = module.default || module;
  app.use(component);
});

app.use(router);

app.mount("#app");
