import "@/assets/index.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { Collapse } from "@oruga-ui/oruga-next";

import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(Collapse).use(router).use(pinia).mount("#app");
