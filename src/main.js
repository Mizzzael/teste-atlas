import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Importando arquivos de css
import "./assets/css/tailwind.compiled.css"
import "../node_modules/font-awesome/css/font-awesome.min.css"

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");