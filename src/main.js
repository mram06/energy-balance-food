import "@/assets/index.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { Collapse } from "@oruga-ui/oruga-next";

import { createPinia } from "pinia";
const pinia = createPinia();

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

createApp(App).use(Collapse).use(router).use(pinia).mount("#app");
