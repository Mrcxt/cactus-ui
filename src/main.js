import { createApp } from "vue";
import App from "./App.vue";
import cactusUI from "~/packages/cactus/index.js";

const vueApp = createApp(App);

vueApp.use(cactusUI);

vueApp.mount("#app");
